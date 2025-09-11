import React from 'react';
import { FormatChip } from '../types';
import { colorMap, colorSwatch } from '../services/colorUtils';
import { COLOR_CHIPS, EFFECT_CHIPS, SIZING_CHIPS } from '../constants';
import { Button } from './ui/Button';
import {
  Bold,
  Underline,
  Italic,
  Strikethrough,
  Baseline,
  Radio,
  FlipHorizontal,
} from 'lucide-react';

const EFFECT_ICONS: { [key: string]: React.ElementType } = {
  Bold: Bold,
  Dim: Baseline,
  Underline: Underline,
  Blink: Radio,
  Reverse: FlipHorizontal,
  Italic: Italic,
  Strike: Strikethrough,
};

interface StyleChipDropdownProps {
  onSelect: (chip: FormatChip) => void;
}

const StyleChipDropdown: React.FC<StyleChipDropdownProps> = ({ onSelect }) => {
  const handleSelect = (chip: FormatChip) => {
    onSelect(chip);
  };

  return (
    <div>
      <div className="py-1">
        <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Colors</div>
        <div className="grid grid-cols-8 gap-2 px-3 pb-2">
          {COLOR_CHIPS.chips
            .filter(chip => {
              const colorName = chip.label.split(': ')[1];
              return colorName && colorMap[colorName.toLowerCase()];
            })
            .map(chip => (
            <button
              key={chip.id}
              onClick={() => handleSelect(chip)}
              className={`w-6 h-6 rounded-md border border-slate-200 dark:border-zinc-700 transition-transform hover:scale-110 ${colorSwatch[chip.label.split(': ')[1].toLowerCase()]}`}
              title={chip.label}
            />
          ))}
        </div>
        <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Effects</div>
        <div className="grid grid-cols-7 gap-1 p-2">
          {EFFECT_CHIPS.chips.map(chip => {
            const Icon = EFFECT_ICONS[chip.label];
            return Icon ? (
              <Button
                key={chip.id}
                variant="ghost"
                size="icon"
                onClick={() => handleSelect(chip)}
                title={chip.label}
              >
                <Icon className="h-4 w-4" />
              </Button>
            ) : null;
          })}
        </div>
        <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Sizing</div>
        <div className="grid grid-cols-2 gap-2 px-3 pb-2">
          {SIZING_CHIPS.chips.map(chip => (
            <Button
              key={chip.id}
              variant="outline"
              size="sm"
              className="h-auto"
              onClick={() => handleSelect(chip)}
            >
              {chip.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyleChipDropdown;
