import { memo } from "react";
import type { InputType } from "../types";

type InputProps = {
  label?:       string;
  placeholder?: string;
  error?:       string;
  value:        string;
  onChange:     (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?:        InputType;
  id?:          string;
  onBlur?:      (e: React.FocusEvent<HTMLInputElement>) => void;
};

// ─── memo kya karta hai yahan? ────────────────────────────────
// Setting page mein 4 Input hain — Name, Email, Role, Password.
// Jab "Name" mein type karo, sirf Name Input re-render hona chahiye.
// Email, Role, Password Input ke props nahi badle —
// memo unhe skip kar deta hai. Unnecessarily kaam nahi karta.
const Input = memo(({
  label,
  placeholder,
  error,
  value,
  onChange,
  type = "text",
  id,
  onBlur,
}: InputProps) => {

  const hasError = error !== undefined && error !== "";

  const borderClass = hasError
    ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
    : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20";

  return (
    <div className="space-y-1">

      {label && (
        <label htmlFor={id} className="text-xs font-medium text-slate-500">
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-3 py-2 text-sm rounded-lg outline-none border transition-all duration-200 placeholder:text-slate-300 ${borderClass}`}
      />

      <p className={`text-xs text-red-500 mt-0.5 transition-opacity duration-300 ${hasError ? "opacity-100" : "opacity-0"}`}>
        {hasError ? error : "\u00A0"}
      </p>

    </div>
  );
});

Input.displayName = "Input";

export default Input;
