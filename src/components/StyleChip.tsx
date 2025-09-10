import React from 'react';
import { FormatChip } from '../types';
import StyleChipDropdown from './StyleChipDropdown';
import { Button } from './ui/Button';
import { Chip } from './ui/Chip';
import { Palette, PlusCircle } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/Popover';

interface StyleChipProps {
  onSelect: (chip: FormatChip) => void;
}

const StyleChip: React.FC<StyleChipProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (chip: FormatChip) => {
    onSelect(chip);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-full">
        <Chip>
          <Palette className="w-4 h-4" />
          <span>Style</span>
        </Chip>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <PlusCircle className="w-4 h-4" />
            <span className="sr-only">Add Style Chip</span>
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0">
        <StyleChipDropdown onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
};


export default StyleChip;
