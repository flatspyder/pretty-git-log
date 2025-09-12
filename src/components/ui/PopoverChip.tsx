import React from 'react';
import { Chip } from './Chip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './Popover';

interface PopoverChipProps {
  icon: React.ElementType;
  label: string;
  children: (close: () => void) => React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  onChipClick?: () => void;
  popoverContentClassName?: string;
}

const PopoverChip: React.FC<PopoverChipProps> = ({
  icon: Icon,
  label,
  children,
  onOpenChange,
  onChipClick,
  popoverContentClassName,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  const close = () => setIsOpen(false);

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Chip
          variant={isOpen ? 'active' : 'default'}
          onClick={onChipClick}
          className="cursor-pointer"
        >
          <Icon size={14} className={isOpen ? 'text-white' : 'text-text-muted'} />
          <span>{label}</span>
          <span className="sr-only">Add {label} chip</span>
        </Chip>
      </PopoverTrigger>
      <PopoverContent className={popoverContentClassName}>
        {children(close)}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverChip;
