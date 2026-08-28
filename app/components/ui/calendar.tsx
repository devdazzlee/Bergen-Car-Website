"use client";

import "react-day-picker/style.css";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "../../lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("rdp-bcc", className)}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";
