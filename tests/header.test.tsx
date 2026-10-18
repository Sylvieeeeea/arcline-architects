import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "@/components/layout/Header";

vi.mock("next/navigation", () => ({ usePathname: () => "/projects/stonecourse-house" }));

// jsdom has no matchMedia, so provide a controllable stand-in for the desktop breakpoint.
type Listener = (event: MediaQueryListEvent) => void;
let listeners: Listener[] = [];

beforeEach(() => {
  listeners = [];
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    addEventListener: (_: string, listener: Listener) => listeners.push(listener),
    removeEventListener: (_: string, listener: Listener) => {
      listeners = listeners.filter((l) => l !== listener);
    },
  })) as unknown as typeof window.matchMedia;
});

describe("Header", () => {
  it("marks the current section in the primary navigation", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav.querySelector('a[href="/projects"]')).toHaveAttribute("aria-current", "page");
    expect(nav.querySelector('a[href="/studio"]')).not.toHaveAttribute("aria-current");
  });

  it("opens an accessible mobile menu, traps focus, and closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: /menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(toggle);
    const dialog = screen.getByRole("dialog", { name: "Site menu" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("button", { name: /close/i })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    // Tab from the last control wraps back to the first (focus is trapped).
    const links = dialog.querySelectorAll<HTMLElement>("a[href], button");
    const last = links[links.length - 1];
    last.focus();
    await user.tab();
    expect(links[0]).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(toggle).toHaveFocus();
  });

  it("closes the menu when a link is chosen", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: /menu/i }));
    const dialog = screen.getByRole("dialog");
    await user.click(dialog.querySelector('a[href="/studio"]') as HTMLElement);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the menu and releases scroll lock when the window grows to desktop width", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: /menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    act(() => listeners.forEach((listener) => listener({ matches: true } as MediaQueryListEvent)));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });
});
