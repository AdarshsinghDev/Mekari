import { memo } from "react";
import type { ButtonVariant, ButtonSize } from "../types";

type ButtonProps = {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  disabled?:  boolean;
  children:   React.ReactNode;
  type?:      "button" | "submit" | "reset";
  onClick?:   (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

// ─── memo kya karta hai? ──────────────────────────────────────
// Parent re-render hone pe Button dobara render NAHI hoga —
// jab tak iski koi prop actually change na ho.
// Jaise: Name field mein type karo → Button ke props nahi badle
// → Button skip ho jaata hai, dobara render nahi karta.
const Button = memo(({
  variant   = "primary",
  size      = "medium",
  disabled  = false,
  children,
  type      = "button",
  onClick,
  className = "",
}: ButtonProps) => {

  let variantClass = "";
  if (variant === "primary") {
    variantClass = "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm shadow-blue-200";
  } else if (variant === "secondary") {
    variantClass = "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:bg-slate-100 shadow-sm";
  } else if (variant === "danger") {
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
});

// DevTools mein component ka naam dikhega — warna "memo" dikhta
Button.displayName = "Button";

export default Button;
