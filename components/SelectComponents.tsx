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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="text-slate-400 text-sm font-semibold mb-2">Elements</h3>
            <div className="flex flex-col gap-2">
              {ELEMENT_CHIP_GROUPS.map(group => (
                <SplitChip
                  key={group.title}
                  title={group.title}
                  chips={group.chips}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-slate-400 text-sm font-semibold mb-2">Styles</h3>
            <StyleChip
              chips={STYLE_CHIPS.chips}
              onSelect={onSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectComponents;
