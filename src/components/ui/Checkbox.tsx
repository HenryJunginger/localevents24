import { cn } from '@/lib/utils';
import { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: string;
}

export function Checkbox({ label, error, className, id, ...props }: CheckboxProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer group">
        <input
          id={id}
          type="checkbox"
          className={cn(
            'mt-0.5 h-4 w-4 shrink-0 rounded border border-border bg-background',
            'accent-primary cursor-pointer',
            error && 'border-danger',
            className,
          )}
          {...props}
        />
        <span className="text-sm text-muted group-hover:text-foreground transition-colors leading-snug">
          {label}
        </span>
      </label>
      {error && <p className="text-xs text-danger pl-6">{error}</p>}
    </div>
  );
}
