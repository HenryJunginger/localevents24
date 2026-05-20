import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={isLoading || disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-colors cursor-pointer',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        {
          'bg-primary text-white hover:bg-primary-hover': variant === 'primary',
          'bg-surface text-foreground border border-border hover:bg-border': variant === 'secondary',
          'text-foreground hover:text-primary': variant === 'ghost',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
        },
        className,
      )}
      {...props}
    >
      {isLoading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
