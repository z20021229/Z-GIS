'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors">
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          {...props}
        />
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${props.checked ? 'translate-x-6 bg-white' : 'translate-x-1'}`}
        />
      </div>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch };