import type { ButtonVariant, ButtonSize } from "../types";

// Button component — teen variants, teen sizes, disabled support

type ButtonProps = {
  // Button ka color style
  // "primary" = blue, "secondary" = gray/bordered, "danger" = red
  variant?: ButtonVariant;

  // Button kitna bada hoga
  size?: ButtonSize;

  // true karo toh button click nahi hoga aur dim dikhega
  disabled?: boolean;

  // Button ke andar dikhne wala text ya element
  children: React.ReactNode;

  // "submit" = form submit karta hai, "button" = sirf click hota hai
  type?: "button" | "submit" | "reset";

  // Button click hone pe kya karna hai
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  // Bahar se extra CSS dena ho toh (optional)
  className?: string;
};

const Button = ({
  variant   = "primary",  // default: blue button
  size      = "medium",   // default: medium size
  disabled  = false,      // default: button active hai
  children,
  type      = "button",
  onClick,
  className = "",
}: ButtonProps) => {

  // Variant ke hisaab se color classes decide karo
  let variantClass = "";

  if (variant === "primary") {
    variantClass = "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm shadow-blue-200";
  } else if (variant === "secondary") {
    variantClass = "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:bg-slate-100 shadow-sm";
  } else if (variant === "danger") {
    variantClass = "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm shadow-red-200";
  }

  // Size ke hisaab se padding decide karo
  let sizeClass = "";

  if (size === "small") {
    sizeClass = "px-3 py-1.5 text-xs rounded-lg";
  } else if (size === "medium") {
    sizeClass = "px-5 py-2.5 text-sm rounded-xl";
  } else if (size === "large") {
    sizeClass = "px-7 py-3 text-base rounded-xl";
  }

  // Disabled hone pe alag cursor aur dim look
  const disabledClass = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";

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
