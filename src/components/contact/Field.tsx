import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ShellProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (describedBy: string | undefined) => ReactNode;
};

/** Shared label, hint and error wiring so every control is announced correctly. */
function FieldShell({ id, label, required, hint, error, children }: ShellProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-4 text-sm font-medium">
        <span>{label}</span>
        <span className="text-xs font-normal text-stone-deep">{required ? "Required" : "Optional"}</span>
      </label>
      {children(describedBy)}
      {hint && (
        <p id={hintId} className="mt-2 text-xs text-stone-deep">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-2 text-sm font-medium text-error">
          <span
            aria-hidden="true"
            className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-error text-[0.65rem] leading-none"
          >
            !
          </span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

const control =
  "block min-h-12 w-full border bg-white px-4 py-3 text-base text-charcoal placeholder:text-stone-deep/70 " +
  "transition-colors duration-200 focus:border-charcoal";

// Control borders must reach 3:1 against the page (WCAG 1.4.11); charcoal/60 measures about 4:1.
const controlBorder = (invalid: boolean) => (invalid ? "border-error" : "border-charcoal/60 hover:border-charcoal");

type CommonProps = Omit<ShellProps, "children">;

export function TextField({
  id,
  label,
  required,
  hint,
  error,
  className,
  ...rest
}: CommonProps & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "required">) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      {(describedBy) => (
        <input
          id={id}
          name={id}
          required={false}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(control, controlBorder(Boolean(error)), className)}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  required,
  hint,
  error,
  options,
  placeholder = "Select an option",
  className,
  ...rest
}: CommonProps & {
  options: readonly string[];
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "required">) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      {(describedBy) => (
        <select
          id={id}
          name={id}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(control, "appearance-auto", controlBorder(Boolean(error)), className)}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  required,
  hint,
  error,
  className,
  ...rest
}: CommonProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "required">) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      {(describedBy) => (
        <textarea
          id={id}
          name={id}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(control, "min-h-40 resize-y", controlBorder(Boolean(error)), className)}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  error,
  children,
  ...rest
}: { id: string; error?: string; children: ReactNode } & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type">) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className="mt-1 h-5 w-5 shrink-0 accent-olive-deep"
          {...rest}
        />
        <label htmlFor={id} className="text-sm leading-6">
          {children}
        </label>
      </div>
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-2 text-sm font-medium text-error">
          <span
            aria-hidden="true"
            className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-error text-[0.65rem] leading-none"
          >
            !
          </span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
