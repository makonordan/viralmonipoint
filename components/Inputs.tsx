"use client";

import { useId } from "react";

const FIELD =
  "w-full rounded-[10px] border-[1.5px] border-line-strong bg-paper px-3.5 py-3 text-[15px] text-text outline-none placeholder:text-grey-dim focus:border-ink focus:shadow-[0_0_0_4px_var(--color-yellow-soft)]";

function Label({ htmlFor, label, hint }: { htmlFor: string; label: string; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-extrabold uppercase tracking-[0.06em] text-ink">
      {label}
      {hint && <span className="ml-1.5 font-semibold normal-case tracking-normal text-grey">{hint}</span>}
    </label>
  );
}

type NumberInputProps = {
  label: string;
  value: number | "";
  onChange: (value: number | "") => void;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  /** Shown inside the field, e.g. "hrs" or "$". */
  suffix?: string;
  prefix?: string;
  placeholder?: string;
};

export function NumberInput({ label, value, onChange, hint, min = 0, max, step = 1, suffix, prefix, placeholder }: NumberInputProps) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} label={label} hint={hint} />
      <div className="relative">
        {prefix && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-grey">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          className={`${FIELD} font-num tabular ${prefix ? "pl-8" : ""} ${suffix ? "pr-14" : ""}`}
          value={value}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        />
        {suffix && <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-grey">{suffix}</span>}
      </div>
    </div>
  );
}

type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
  maxLength?: number;
  /** Render a multi-line textarea instead of a single-line input. */
  multiline?: boolean;
  rows?: number;
};

export function TextInput({ label, value, onChange, hint, placeholder, maxLength, multiline, rows = 4 }: TextInputProps) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} label={label} hint={hint} />
      {multiline ? (
        <textarea id={id} className={`${FIELD} resize-y`} rows={rows} value={value} placeholder={placeholder} maxLength={maxLength} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} type="text" className={FIELD} value={value} placeholder={placeholder} maxLength={maxLength} onChange={(e) => onChange(e.target.value)} />
      )}
      {maxLength && <p className="mb-0 mt-1 text-right text-xs text-grey-dim tabular">{value.length}/{maxLength}</p>}
    </div>
  );
}

type SelectProps<T extends string> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  hint?: string;
};

export function Select<T extends string>({ label, value, onChange, options, hint }: SelectProps<T>) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} label={label} hint={hint} />
      <select id={id} className={`${FIELD} cursor-pointer`} value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
