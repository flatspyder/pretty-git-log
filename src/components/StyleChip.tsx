import React, { useState, useRef, useEffect } from 'react';
import { FormatChip } from '../types';
import StyleChipDropdown from './StyleChipDropdown';

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
      <div className="flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
            className="relative inline-flex items-center px-3 py-1 rounded-l-md border border-surface-hover bg-surface-muted text-sm font-medium text-light hover:bg-surface-hover focus:z-10 focus:outline-none focus:ring-1 focus:ring-muted"
        >
          Style
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
            className="relative inline-flex items-center px-2 py-1 rounded-r-md border border-l-0 border-surface-hover bg-surface-muted text-sm font-medium text-light hover:bg-surface-hover focus:z-10 focus:outline-none focus:ring-1 focus:ring-muted"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <StyleChipDropdown onSelect={handleSelect} />
      )}
    </div>
  );
};

export default StyleChip;
