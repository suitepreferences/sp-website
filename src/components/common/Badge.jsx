import React from "react";

function Badge({ text, variant = "default", size = "md" }) {
  const baseClasses = "inline-flex items-center justify-center font-bold shadow-lg";

  const variantClasses = {
    default: "bg-indigo-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-600 text-white",
    danger: "bg-red-600 text-white",
    discount: "bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-800",
    limited: "bg-black text-white border-2 border-white relative overflow-hidden",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  if (variant === "limited") {
    return (
      <div className={`${classes} rounded-full relative mb-6`}>
        {/* Scalloped edge effect */}
        <div className="absolute inset-0 rounded-full border-2 border-white"></div>
        <div className="relative z-10 px-2 py-1">
          <div className="text-center font-extrabold tracking-wider">{text}</div>
          {/* Diagonal accent line */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-600 to-transparent opacity-20 transform -rotate-12"></div>
        </div>
      </div>
    );
  }

  return <span className={`${classes} rounded-full`}>{text}</span>;
}

export default Badge;
