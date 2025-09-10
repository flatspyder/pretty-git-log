import React from 'react';
import { FormatChip } from '../types';
import Card from './Card';
import SectionHeading from './SectionHeading';
import { ELEMENT_CHIP_GROUPS, STYLE_CHIPS, createTextChip } from '../constants'; // Changed import
import { PlusCircle } from 'lucide-react';

interface SelectComponentsProps {
  onSelect: (chip: FormatChip) => void;
}

const PaletteChip = ({ label, onSelect }: { label: string, onSelect: () => void }) => (
  <button
    onClick={onSelect}
    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors
               border-slate-200 bg-white text-slate-700 hover:bg-slate-50
               dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-slate-200 dark:hover:bg-zinc-700
               focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-zinc-900"
  >
    <PlusCircle size={14} className="text-slate-400" />
    {label}
  </button>
);

const SelectComponents: React.FC<SelectComponentsProps> = ({ onSelect }) => {
  return (
    <Card>
      <div className="p-4 sm:p-6">
        <SectionHeading className="mb-4">Tokens Palette</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {ELEMENT_CHIP_GROUPS.map(group => (
            <PaletteChip
              key={group.title}
              label={group.title}
              onSelect={() => onSelect(group.chips[0])}
            />
          ))}
          <PaletteChip
            label="Color"
            onSelect={() => onSelect(STYLE_CHIPS[0].chips[0])} // Corrected to select a chip from the group
          />
          <PaletteChip
            label="Text"
            onSelect={() => onSelect(createTextChip(' '))} // Changed to call createTextChip
          />
        </div>
      </div>
    </Card>
  );
};

export default SelectComponents;
