import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'primary';
  className?: string;
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium',
        {
          'bg-surface text-muted border border-border': variant === 'default',
          'bg-primary-light text-primary': variant === 'primary',
        },
        className,
      )}
    >
      {label}
    </span>
  );
}
