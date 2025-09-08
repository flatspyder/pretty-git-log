import React from 'react';
import { FormatChip } from '../types';
import SplitChip from './SplitChip';
import StyleChip from './StyleChip';
import { ELEMENT_CHIP_GROUPS, STYLE_CHIPS } from '../constants';

interface SelectComponentsProps {
  onSelect: (chip: FormatChip) => void;
}

const SelectComponents: React.FC<SelectComponentsProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-4xl mb-8">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">1. Select Components</h2>
      <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
        <div className="flex flex-wrap gap-4">
          {ELEMENT_CHIP_GROUPS.map(group => (
            <SplitChip
              key={group.title}
              title={group.title}
              chips={group.chips}
              onSelect={onSelect}
            />
          ))}
          <StyleChip
            chips={STYLE_CHIPS.chips}
            onSelect={onSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectComponents;
