import React, { useState, useRef, useEffect } from 'react';
import { FormatChip } from '../types';
import { Button } from './ui/Button';
import { User, GitCommit, Calendar, ChevronDown } from 'lucide-react';

interface SplitChipProps {
  title: string;
  chips: FormatChip[];
  onSelect: (chip: FormatChip) => void;
}

const ICONS: { [key: string]: React.ElementType } = {
  Author: User,
  Commit: GitCommit,
  Date: Calendar,
};

const SplitChip: React.FC<SplitChipProps> = ({ title, chips, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const Icon = ICONS[title] || GitCommit;

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

const SplitChip: React.FC<SplitChipProps> = ({ title, chips, onSelect }) => {
  // ... (hooks remain the same)
  const Icon = ICONS[title] || GitCommit;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-full">
        <Chip>
          <Icon className="w-4 h-4" />
          <span>{title}</span>
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
          <span className="sr-only">Add {title} Chip</span>
        </Button>
      </div>

      {isOpen && (
        <div
          className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {chips.map(chip => (
              <a
                href="#"
                key={chip.id}
                className="text-slate-700 dark:text-slate-200 block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-zinc-700"
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

export default SplitChip;
