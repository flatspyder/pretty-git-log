import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';

const chipVariants = cva(
  'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-zinc-900',
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
        {onRemove && (<div className="w-px h-4 bg-slate-200 dark:bg-zinc-700"></div>)}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent chip click events
              onRemove();
            }}
            className="-mr-1 rounded-full p-0.5 text-slate-400 hover:bg-slate-200/50 hover:text-slate-600 dark:hover:bg-zinc-700/50 dark:hover:text-slate-300"
          >
            <X size={14} />
          </button>
        )}
      </Comp>
    );
  }
);
Chip.displayName = 'Chip';

export { Chip, chipVariants };
