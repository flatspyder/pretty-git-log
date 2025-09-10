import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';

const chipVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-slate-200 dark:hover:bg-zinc-700',
        active: 'text-white border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 shadow',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  asChild?: boolean;
  onRemove?: () => void;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, asChild = false, onRemove, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp className={clsx(chipVariants({ variant }), className)} ref={ref} {...props}>
        {children}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent chip click events
              onRemove();
            }}
            className="-mr-1 h-4 w-4 rounded-full flex items-center justify-center text-current hover:bg-black/10 dark:hover:bg-white/10"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </Comp>
    );
  }
);
Chip.displayName = 'Chip';

export { Chip, chipVariants };
