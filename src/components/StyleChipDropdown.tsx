import React from 'react';
import { ChipDefinition } from '../types';
import { colorMap, colorSwatch } from '../services/colorUtils';
import { COLOR_CHIPS, EFFECT_CHIPS, SIZING_CHIPS } from '../constants';
import { Button } from './ui/Button';
import SizingChipControl from './SizingChipControl';
import {
  Ban,
  Bold,
  Underline,
  Italic,
  Strikethrough,
  Minus,
  Radio,
  FlipHorizontal,
} from 'lucide-react';

const EFFECT_ICONS: { [key: string]: React.ElementType } = {
  Bold: Bold,
  Dim: Minus,
  Underline: Underline,
  Blink: Radio,
  Reverse: FlipHorizontal,
  Italic: Italic,
  Strike: Strikethrough,
};

interface StyleChipDropdownProps {
  onSelect: (chip: ChipDefinition) => void;
  onHover: (id: string | null) => void;
}

const StyleChipDropdown: React.FC<StyleChipDropdownProps> = ({ onSelect, onHover }) => {
  const handleSelect = (chip: ChipDefinition) => {
    onSelect(chip);
  };

  const resetChip = COLOR_CHIPS.chips.find(c => c.id === 'C-reset');
  const otherColorChips = COLOR_CHIPS.chips.filter(c => c.id !== 'C-reset');

  return (
    <div >
      <div className="py-1">
        <div className="px-3 py-2 text-xs font-semibold text-text-muted">Colors</div>
        <div className="grid grid-cols-8 gap-2 px-3 pb-2 items-center">
          {resetChip && (
             <Button
                key={resetChip.id}
                variant="outline"
                size="icon"
                onClick={() => handleSelect(resetChip)}
                onMouseEnter={() => onHover(resetChip.id)}
                title={resetChip.label}
                className="w-6 h-6"
              >
                <Ban className="h-4 w-4 text-danger" />
              </Button>
          )}
          {otherColorChips
            .filter(chip => {
              const colorName = chip.label.split(': ')[1];
              return colorName && colorMap[colorName.toLowerCase()];
            })
            .map(chip => (
            <button
              key={chip.id}
              onClick={() => handleSelect(chip)}
              onMouseEnter={() => onHover(chip.id)}
              className={`w-6 h-6 rounded-md border border-border transition-transform hover:scale-110 ${colorSwatch[chip.label.split(': ')[1].toLowerCase()]}`}
              title={chip.label}
            />
          ))}
        </div>
        <div className="px-3 py-2 text-xs font-semibold text-text-muted">Effects</div>
        <div className="grid grid-cols-7 gap-1 p-2">
          {EFFECT_CHIPS.chips.map(chip => {
            const Icon = EFFECT_ICONS[chip.label];
            return Icon ? (
              <Button
                key={chip.id}
                variant="ghost"
                size="icon"
                onClick={() => handleSelect(chip)}
                onMouseEnter={() => onHover(chip.id)}
                title={chip.label}
              >
                <Icon className="h-4 w-4" />
              </Button>
            ) : null;
          })}
        </div>
        <div className="px-3 py-2 text-xs font-semibold text-text-muted">Sizing</div>
        <div className="flex flex-col gap-2 px-3 pb-2">
          {SIZING_CHIPS.chips.map(chip => (
            <SizingChipControl
              key={chip.id}
              chipDef={chip}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyleChipDropdown;
