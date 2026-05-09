import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  fullWidth = true,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label className="text-xs text-zinc-500 uppercase tracking-widest">
          {label}
        </label>
      )}
      <input
        className={`
          h-12 px-4 text-sm
          bg-zinc-900 text-white
          border border-zinc-800
          rounded-lg outline-none
          placeholder-zinc-600
          transition-all duration-200
          focus:border-red-600
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
