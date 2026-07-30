// Input component — label, placeholder, error message, value, onChange support

type InputProps = {
  label?: string;

  placeholder?: string;

  error?: string;

  value: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  type?: string;

  id?: string;
  onBlur?: () => void;
};

const Input = ({
  label,
  placeholder,
  error,
  value,
  onChange,
  type = "text",   // default: text input
  id,
  onBlur,
}: InputProps) => {

  // error hai ya nahi — simple boolean
  const hasError = error !== undefined && error !== "";

  // --- Error hone pe red border, nahi toh blue focus ---
  const borderClass = hasError
    ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
    : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20";

  return (
    <div className="space-y-1">

      {/* Label — sirf tab dikhao jab label prop diya ho */}
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-slate-500">
          {label}
        </label>
      )}

      {/* Actual input field */}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-3 py-2 text-sm rounded-lg outline-none border transition-all duration-200 placeholder:text-slate-300 ${borderClass}`}
      />

      {/* Error message — opacity se fade in/out hota hai, layout nahi hilta */}
      <p className={`text-xs text-red-500 mt-0.5 transition-opacity duration-300 ${hasError ? "opacity-100" : "opacity-0"}`}>
        {/* Non-breaking space — jab error nahi, toh height reserve rahti hai */}
        {hasError ? error : "\u00A0"}
      </p>

    </div>
  );
};

export default Input;
