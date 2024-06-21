import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "icon";
}

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
}: ButtonProps) => {
  const baseClasses = "rounded-lg font-bold mt-6xl";

  const getClasses = () => {
    switch (variant) {
      case "primary":
        return `${baseClasses} bg-accent py-sm px-2xl`;
      case "icon":
        return `${baseClasses} bg-[transparent]`;
      default:
        return baseClasses;
    }
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${getClasses()}`}
    >
      {children}
    </button>
  );
};

export default Button;
