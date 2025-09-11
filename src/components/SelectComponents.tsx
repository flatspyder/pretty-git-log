import React from 'react';
import { ChipDefinition } from '../types';
import SplitChip from './SplitChip';
import StyleChip from './StyleChip';
import TextChip from './TextChip';
import { ELEMENT_CHIP_GROUPS } from '../constants';

interface SelectComponentsProps {
  onSelect: (chip: ChipDefinition) => void;
  selectedPaletteChipId: string | null;
  onSelectPaletteChip: (id: string | null) => void;
}

const SelectComponents: React.FC<SelectComponentsProps> = ({
  onSelect,
  selectedPaletteChipId,
  onSelectPaletteChip,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {ELEMENT_CHIP_GROUPS.map(group => (
        <SplitChip
          key={group.title}
          title={group.title}
          chips={group.chips}
          onSelect={onSelect}
          selectedChipId={selectedPaletteChipId}
          onSelectChip={onSelectPaletteChip}
        />
      ))}
      <TextChip
        onSelect={onSelect}
        selectedChipId={selectedPaletteChipId}
        onSelectChip={onSelectPaletteChip}
      />
      <StyleChip
        onSelect={onSelect}
        selectedChipId={selectedPaletteChipId}
        onSelectChip={onSelectPaletteChip}
      />
    </div>
  );
};

export default SelectComponents;