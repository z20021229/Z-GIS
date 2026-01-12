'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    onCheckedChange?: (checked: boolean) => void;
  }
>(({ className, onCheckedChange, ...props }, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(event.target.checked);
    }
  };

  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        'peer sr-only',
        className
      )}
      onChange={handleChange}
      {...props}
    />
  );
});
Switch.displayName = 'Switch';

export { Switch };