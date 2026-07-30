// Button component — teen variants, teen sizes, disabled support

type ButtonProps = {
  // variant decide  button color/style
  // primary = blue, secondary = gray bordered, danger = red
  variant?: "primary" | "secondary" | "danger";

  // size decide karta hai button kitna bada hoga
  size?: "small" | "medium" | "large";

  // disabled = true karne pe button click nahi hoga
  disabled?: boolean;

  // button ke andar jo text ya element dikhana ho
  children: React.ReactNode;

  // button ka type — "submit" form submit karta hai, "button" nahi karta
  type?: "button" | "submit" | "reset";

  // click hone pe kya karna hai
  onClick?: () => void;

  // extra CSS classes add karne ke liye (optional)
  className?: string;
};

const Button = ({
  variant = "primary",    // default: blue button
  size = "medium",        // default: medium size
  disabled = false,       // default: button active hai
  children,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) => {

  let variantClass = "";

  if (variant === "primary") {
    // Solid blue button
    variantClass = "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm shadow-blue-200";
  } else if (variant === "secondary") {
    // White button with gray border
    variantClass = "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:bg-slate-100 shadow-sm";
  } else if (variant === "danger") {
    // Red button for delete/cancel
    variantClass = "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm shadow-red-200";
  }

  let sizeClass = "";

  if (size === "small") {
    sizeClass = "px-3 py-1.5 text-xs rounded-lg";
  } else if (size === "medium") {
    sizeClass = "px-5 py-2.5 text-sm rounded-xl";
  } else if (size === "large") {
    sizeClass = "px-7 py-3 text-base rounded-xl";
  }

  const disabledClass = disabled
    ? "opacity-60 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-medium transition-all duration-200 ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
