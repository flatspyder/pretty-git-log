import React from 'react';
import { ChipDefinition } from '../types';
import StyleChipDropdown from './StyleChipDropdown';
import { Palette } from 'lucide-react';
import PopoverChip from './ui/PopoverChip';

interface StyleChipProps {
  onSelect: (chip: ChipDefinition) => void;
  onSelectChip: (id: string | null) => void;
}

const StyleChip: React.FC<StyleChipProps> = ({
  onSelect,
  onSelectChip,
}) => {
  return (
    <PopoverChip
      icon={Palette}
      label="Style"
      onChipClick={() => onSelectChip('C-color-red')}
      onOpenChange={open => {
        if (!open) onSelectChip(null);
      }}
      popoverContentClassName="w-auto p-0"
    >
      {close => (
        <StyleChipDropdown
          onSelect={chip => {
            onSelect(chip);
            close();
          }}
          onHover={onSelectChip}
        />
      )}
    </PopoverChip>
  );
};

export default StyleChip;
