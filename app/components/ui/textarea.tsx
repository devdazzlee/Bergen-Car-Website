"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[96px] w-full resize-none rounded-xl border border-line-strong bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-navy-400 focus:border-navy focus:ring-2 focus:ring-navy/15 disabled:opacity-60",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
