"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-xl border border-line-strong bg-white px-3.5 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-navy-400 focus:border-navy focus:ring-2 focus:ring-navy/15 disabled:opacity-60",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        "flex h-11 w-full appearance-none rounded-xl border border-line-strong bg-white pl-3.5 pr-9 text-[15px] font-medium text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-navy focus:ring-2 focus:ring-navy/15 disabled:opacity-60",
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </div>
));
NativeSelect.displayName = "NativeSelect";

export { Input, NativeSelect };
