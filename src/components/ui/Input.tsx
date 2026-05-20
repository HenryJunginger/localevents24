import { cn } from '@/lib/utils';
import { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label?: string;
}

export function Input({ icon, label, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-muted pointer-events-none">{icon}</span>
        )}
        <input
          id={id}
          className={cn(
            'w-full border border-border rounded-md bg-white text-foreground placeholder:text-muted',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'py-2.5 text-sm transition',
            icon ? 'pl-9 pr-3' : 'px-3',
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}
