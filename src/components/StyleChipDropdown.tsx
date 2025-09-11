import React from 'react';
import { FormatChip } from '../types';
import { colorMap, colorSwatch } from '../services/colorUtils';
import { COLOR_CHIPS, EFFECT_CHIPS, SIZING_CHIPS } from '../constants';

interface StyleChipDropdownProps {
  onSelect: (chip: FormatChip) => void;
}

const StyleChipDropdown: React.FC<StyleChipDropdownProps> = ({ onSelect }) => {
  const handleSelect = (chip: FormatChip) => {
    onSelect(chip);
  };

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div className="py-1 " role="none">
        <div className="px-4 py-2 text-sm text-light font-bold">Colors</div>
        <div className="grid grid-cols-8 grid-rows-1 gap-2 px-4 py-2">
          {COLOR_CHIPS.chips
            .filter(chip => {
              const colorName = chip.label.split(': ')[1];
              return colorName && colorMap[colorName.toLowerCase()];
            })
            .map(chip => (
            <button
              key={chip.id}
              onClick={() => handleSelect(chip)}
              className={`w-8 h-8 rounded-md border border-surface-hover ${colorSwatch[chip.label.split(': ')[1].toLowerCase()]}`}
            >
              &nbsp;
            </button>
          ))}
        </div>
        <div className="px-4 py-2 text-sm text-light font-bold">Effects</div>
        <div className="grid grid-cols-4 gap-2 px-4 py-2">
          {EFFECT_CHIPS.chips.map(chip => (
            <a
              href="#"
              key={chip.id}
              className="text-light block px-4 py-2 text-sm hover:bg-surface-hover text-center"
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
        <div className="px-4 py-2 text-sm text-light font-bold">Sizing</div>
        <div className="grid grid-cols-2 gap-2 px-4 py-2">
          {SIZING_CHIPS.chips.map(chip => (
            <a
              href="#"
              key={chip.id}
              className="text-light block px-4 py-2 text-sm hover:bg-surface-hover text-center"
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
    </div>
  );
};

export default StyleChipDropdown;
