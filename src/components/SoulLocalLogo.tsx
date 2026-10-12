import React from "react";

interface SoulLocalLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

export const SoulLocalLogo: React.FC<SoulLocalLogoProps> = ({
  className = "",
  size = "md",
  showWordmark = true,
}) => {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* SoulLocal Emblem: stylized geometric map pin with organic inner soul swirl */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-sm shadow-blue-500/20 ring-1 ring-white/20`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6 text-white"
        >
          {/* Stylized Pin Frame */}
          <path
            d="M12 2C7.8 2 4.5 5.3 4.5 9.5C4.5 14.8 11.2 21.4 11.5 21.7C11.8 22 12.2 22 12.5 21.7C12.8 21.4 19.5 14.8 19.5 9.5C19.5 5.3 16.2 2 12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner organic soul flame/spark */}
          <path
            d="M12 6.5C12 6.5 10.2 8.2 10.2 9.8C10.2 10.8 11 11.6 12 11.6C13 11.6 13.8 10.8 13.8 9.8C13.8 8.8 12 6.5 12 6.5Z"
            fill="#38BDF8"
          />
          <circle cx="12" cy="13.2" r="1.3" fill="white" />
        </svg>
      </div>

      {showWordmark && (
        <div className={`font-sans tracking-tight ${textSizes[size]} leading-none`}>
          <span className="font-extrabold text-slate-900 dark:text-white">Soul</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">Local</span>
        </div>
      )}
    </div>
  );
};
