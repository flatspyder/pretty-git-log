import React from 'react';
import { FormatChip } from '../types';
import SplitChip from './SplitChip';
import StyleChip from './StyleChip';
import TextChip from './TextChip';
import { ELEMENT_CHIP_GROUPS } from '../constants';

interface SelectComponentsProps {
  onSelect: (chip: FormatChip) => void;
}

const SelectComponents: React.FC<SelectComponentsProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {ELEMENT_CHIP_GROUPS.map(group => (
        <SplitChip
          key={group.title}
          title={group.title}
          chips={group.chips}
          onSelect={onSelect}
        />
      ))}
      <TextChip onSelect={onSelect} />
      <StyleChip onSelect={onSelect} />
    </div>
  );
};

export default SelectComponents;