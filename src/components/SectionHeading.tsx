import React from 'react';
import clsx from 'clsx';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children, className }) => {
  return (
    <h2 className={clsx('text-xs uppercase tracking-widest font-semibold text-text-muted', className)}>
      {children}
    </h2>
  );
};

export default SectionHeading;