import type { InputType } from "../types";

// Input component — label, placeholder, error message, value, onChange support

type InputProps = {
  // Field ke upar dikhne wala label — jaise "Name", "Email"
  label?: string;

  // Input ke andar hint text — jab kuch na likha ho tab dikhta hai
  placeholder?: string;

  // Validation error message — galat value pe red text neeche dikhta hai
  error?: string;

  // Input mein abhi kya likha hai
  value: string;

  // Jab user kuch type kare toh yeh function call hoga
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Input ka type — "text", "email", "password", etc.
  type?: InputType;

  // Label aur input ko link karne ke liye — dono ka id same hona chahiye
  id?: string;

  // Jab user input se bahar click kare — validation ke liye useful
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = ({
  label,
  placeholder,
  error,
  value,
  onChange,
  type = "text",
  id,
  onBlur,
}: InputProps) => {

  // Kya error hai? — simple true/false check
  const hasError = error !== undefined && error !== "";

  // Error hone pe red border, warna normal gray + blue on focus
  const borderClass = hasError
    ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
    : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20";

  return (
    <div className="space-y-1">

      {/* Label — sirf tab render hoga jab label prop diya ho */}
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-slate-500">
          {label}
        </label>
      )}

      {/* Input box */}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-3 py-2 text-sm rounded-lg outline-none border transition-all duration-200 placeholder:text-slate-300 ${borderClass}`}
      />

      {/* Error message — opacity se dikhta/chhupta hai, layout nahi hilta */}
      <p className={`text-xs text-red-500 mt-0.5 transition-opacity duration-300 ${hasError ? "opacity-100" : "opacity-0"}`}>
        {/* Jab error nahi — invisible space taaki height bani rahe */}
        {hasError ? error : "\u00A0"}
      </p>

    </div>
  );
};

export default Input;
