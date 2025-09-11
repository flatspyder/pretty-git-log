import React from 'react';
import { ChipDefinition } from '../types';
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
  onSelect: (chip: ChipDefinition) => void;
}

const StyleChip: React.FC<StyleChipProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (chip: ChipDefinition) => {
    onSelect(chip);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Chip>
          <Palette size={14} className="text-slate-400" />
          <span>Style</span>
          <span className="sr-only">Add style chip</span>
        </Chip>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <StyleChipDropdown onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
};


export default StyleChip;
