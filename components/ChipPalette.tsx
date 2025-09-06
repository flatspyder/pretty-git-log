import React from 'react';
import { AVAILABLE_CHIPS } from './chipConstants.js';
import Chip from './Chip.js';
import { Chip as ChipType } from '../types.js';

const ChipPalette: React.FC = () => {
  const groupedChips = AVAILABLE_CHIPS.reduce((acc, chip) => {
    if (!acc[chip.category]) {
      acc[chip.category] = [];
    }
    acc[chip.category].push(chip);
    return acc;
  }, {} as Record<string, ChipType[]>);

  return (
    <div className="p-4 bg-slate-800 rounded-lg">
      <h3 className="text-lg font-bold text-slate-300 mb-4">Available Chips</h3>
      {Object.entries(groupedChips).map(([category, chips]) => (
        <div key={category} className="mb-4">
          <h4 className="text-md font-semibold text-cyan-400 mb-2">{category}</h4>
          <div className="flex flex-wrap">
            {chips.map(chip => (
              <Chip key={chip.id} chip={chip} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChipPalette;
