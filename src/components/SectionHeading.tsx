import React from 'react';
import clsx from 'clsx';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children, className }) => {
  return (
    <h2 className={clsx('text-xs uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400', className)}>
      {children}
    </h2>
  );
};

export default SectionHeading;