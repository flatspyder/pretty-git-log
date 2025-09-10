import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow hover:shadow-md active:scale-[.99]',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-slate-200/70 dark:border-white/10 hover:bg-slate-50/60 dark:hover:bg-white/5',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-zinc-800 dark:text-slate-50 dark:hover:bg-zinc-700',
        ghost: 'hover:bg-slate-100 dark:hover:bg-zinc-800',
        link: 'text-indigo-500 underline-offset-4 hover:underline dark:text-indigo-400',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
