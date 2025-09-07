import React, { useState, useRef, useEffect } from 'react';
import { FormatChip } from '../types';

interface StyleChipProps {
  chips: FormatChip[];
  onSelect: (chip: FormatChip) => void;
}

const colorMap: { [key: string]: string } = {
  black: '#000000',
  red: '#ff0000',
  green: '#008000',
  yellow: '#ffff00',
  blue: '#0000ff',
  magenta: '#ff00ff',
  cyan: '#00ffff',
  white: '#ffffff',
};

const getContrastingTextColor = (color: string): string => {
  const hex = colorMap[color] || color;
  if (!hex.startsWith('#')) {
    return '#ffffff';
  }

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
};

const StyleChip: React.FC<StyleChipProps> = ({ chips, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (chip: FormatChip) => {
    onSelect(chip);
    const colorMatch = chip.value.match(/%C\(([^)]+)\)/);
    if (colorMatch && colorMatch[1] !== 'reset' && colorMatch[1] !== 'normal' && colorMatch[1] !== 'default') {
      setSelectedColor(colorMatch[1]);
    } else {
      setSelectedColor(null);
    }
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

  const textColor = selectedColor ? getContrastingTextColor(selectedColor) : '#ffffff';
  const buttonStyle = selectedColor ? { backgroundColor: colorMap[selectedColor] || selectedColor, color: textColor } : {};

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative inline-flex items-center px-3 py-1 rounded-l-md border border-slate-600 bg-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-600 focus:z-10 focus:outline-none focus:ring-1 focus:ring-slate-500"
          style={buttonStyle}
        >
          Style
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative inline-flex items-center px-2 py-1 rounded-r-md border border-l-0 border-slate-600 bg-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-600 focus:z-10 focus:outline-none focus:ring-1 focus:ring-slate-500"
          aria-haspopup="true"
          aria-expanded={isOpen}
          style={selectedColor ? { ...buttonStyle, borderLeftColor: textColor } : {}}
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
        <div
          className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {chips.map(chip => (
              <a
                href="#"
                key={chip.id}
                className="text-slate-200 block px-4 py-2 text-sm hover:bg-slate-600"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(chip);
                }}
              >
                {chip.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StyleChip;
