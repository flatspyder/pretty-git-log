import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Card: React.FC<CardProps> = ({ children, className, as: Component = 'div', ...props }) => {
  return (
    <Component
      className={clsx(
        'rounded-2xl border bg-white/60 dark:bg-zinc-900/60',
        'border-slate-200/80 dark:border-white/10',
        'backdrop-blur-xl supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-zinc-900/40',
        'shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
