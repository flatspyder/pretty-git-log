import React, { useState, useRef, useEffect } from 'react';
import { FormatChip } from '../types';
import StyleChipDropdown from './StyleChipDropdown';
import { Button } from './ui/Button';
import { Palette, ChevronDown } from 'lucide-react';

interface StyleChipProps {
  onSelect: (chip: FormatChip) => void;
}

const StyleChip: React.FC<StyleChipProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (chip: FormatChip) => {
    onSelect(chip);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

import { Chip } from './ui/Chip';
import { PlusCircle } from 'lucide-react';

// ... (imports remain the same)

const StyleChip: React.FC<StyleChipProps> = ({ onSelect }) => {
  // ... (hooks remain the same)

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-full">
        <Chip>
          <Palette className="w-4 h-4" />
          <span>Style</span>
        </Chip>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-6 w-6"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <PlusCircle className="w-4 h-4" />
          <span className="sr-only">Add Style Chip</span>
        </Button>
      </div>

      {isOpen && (
        <StyleChipDropdown onSelect={handleSelect} />
      )}
    </div>
  );
};

export default StyleChip;
