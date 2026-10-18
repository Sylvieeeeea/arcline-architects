import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type User = ReturnType<typeof userEvent.setup>;

async function loadForm(endpoint: string) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_INQUIRY_ENDPOINT", endpoint);
  const mod = await import("@/components/contact/ContactForm");
  return mod.ContactForm;
}

async function fillValid(user: User) {
  await user.type(screen.getByLabelText(/full name/i), "Amina Otieno");
  await user.type(screen.getByLabelText(/email address/i), "amina@example.com");
  await user.type(screen.getByLabelText(/project location/i), "Nairobi");
  await user.selectOptions(screen.getByLabelText(/project type/i), "Residential");
  await user.type(screen.getByLabelText(/project description/i), "A family home on a gently sloping plot.");
  await user.click(screen.getByRole("checkbox", { name: /i agree/i }));
}

beforeEach(() => {
  vi.unstubAllEnvs();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("ContactForm without a submission service", () => {
  it("tells the visitor up front that the form cannot send yet", async () => {
    const ContactForm = await loadForm("");
    render(<ContactForm />);
    expect(screen.getByText(/inquiry service is not connected yet/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /check my inquiry/i })).toBeInTheDocument();
  });

  it("shows an error summary, marks fields invalid, and moves focus to the summary", async () => {
    const user = userEvent.setup();
    const ContactForm = await loadForm("");
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /check my inquiry/i }));

    const summary = await screen.findByRole("alert");
    expect(summary).toHaveTextContent(/these 6 fields/i);
    await waitFor(() => expect(summary).toHaveFocus());

    const name = screen.getByLabelText(/full name/i);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription(/enter your full name/i);
    expect(screen.getByLabelText(/phone number/i)).not.toHaveAttribute("aria-invalid");
  });

  it("clicking a summary item focuses the field", async () => {
    const user = userEvent.setup();
    const ContactForm = await loadForm("");
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /check my inquiry/i }));
    await user.click(await screen.findByRole("link", { name: /email address: enter your email/i }));
    expect(screen.getByLabelText(/email address/i)).toHaveFocus();
  });

  it("validates a field after the visitor leaves it", async () => {
    const user = userEvent.setup();
    const ContactForm = await loadForm("");
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/email address/i), "not-an-email");
    await user.tab();
    expect(screen.getByLabelText(/email address/i)).toHaveAccessibleDescription(/valid email address/i);
  });

  it("never claims success: a valid inquiry is reported as NOT sent and no request is made", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const ContactForm = await loadForm("");
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /check my inquiry/i }));

    expect(await screen.findByText(/your inquiry has not been sent/i)).toBeInTheDocument();
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
    // The visitor's answers are preserved.
    expect(screen.getByLabelText(/full name/i)).toHaveValue("Amina Otieno");
  });

  it("lets the visitor copy their inquiry as text", async () => {
    const user = userEvent.setup();
    const ContactForm = await loadForm("");
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /check my inquiry/i }));
    await user.click(await screen.findByRole("button", { name: /copy my inquiry/i }));

    expect(await screen.findByText(/copied to your clipboard/i)).toBeInTheDocument();
    const copied = await navigator.clipboard.readText();
    expect(copied).toContain("Name: Amina Otieno");
    expect(copied).toContain("Project type: Residential");
  });
});

describe("ContactForm with a submission service", () => {
  const endpoint = "https://forms.example.test/f/abc123";

  it("posts JSON and shows success only after a confirmed 2xx response", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);
    const ContactForm = await loadForm(endpoint);
    render(<ContactForm />);

    expect(screen.queryByText(/not connected yet/i)).not.toBeInTheDocument();
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(endpoint);
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toMatchObject({ name: "Amina Otieno", email: "amina@example.com", projectType: "Residential" });
  });

  it("shows a loading state while the request is in flight", async () => {
    const user = userEvent.setup();
    let resolve!: (value: { ok: boolean; status: number }) => void;
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise((r) => (resolve = r))));
    const ContactForm = await loadForm(endpoint);
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    const busy = await screen.findByRole("button", { name: /sending/i });
    expect(busy).toBeDisabled();
    expect(busy).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();

    resolve({ ok: true, status: 200 });
    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
  });

  it("reports a service error honestly and keeps the visitor's answers", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const ContactForm = await loadForm(endpoint);
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(await screen.findByText(/your inquiry was not sent/i)).toBeInTheDocument();
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/project description/i)).toHaveValue("A family home on a gently sloping plot.");
  });

  it("reports a network failure honestly", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    const ContactForm = await loadForm(endpoint);
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(await screen.findByText(/could not reach the inquiry service/i)).toBeInTheDocument();
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
  });
});
