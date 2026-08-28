"use client";

import * as React from "react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { IconCalendar } from "../icons";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function DatePicker({
  value,
  onChange,
  onClose,
  id,
  className,
  placeholder = "Pick a date",
}: {
  value?: Date;
  onChange: (d?: Date) => void;
  onClose?: () => void;
  id?: string;
  className?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) onClose?.();
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          className={cn(
            "flex h-11 w-full items-center gap-2 rounded-xl border border-line-strong bg-white px-3.5 text-left text-[15px] outline-none transition-[border-color,box-shadow] duration-200 focus:border-navy focus:ring-2 focus:ring-navy/15",
            !value && "text-navy-400",
            className,
          )}
        >
          <IconCalendar className="h-4 w-4 shrink-0 text-navy-500" />
          <span className="truncate">
            {value ? format(value, "EEE, MMM d, yyyy") : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value ?? today}
          disabled={{ before: today }}
          onSelect={(d) => {
            onChange(d);
            if (d) setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
