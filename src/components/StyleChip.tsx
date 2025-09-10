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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="inline-flex rounded-full">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-r-none pl-3 pr-2"
        >
          <Palette className="w-4 h-4 mr-2" />
          Style
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-l-none px-2"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {isOpen && (
        <StyleChipDropdown onSelect={handleSelect} />
      )}
    </div>
  );
};

export default StyleChip;
