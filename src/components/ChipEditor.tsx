import React, { useState } from 'react';
import { FormatChip, ChipGroup, ChipDefinition } from '../types';
import StyleChipDropdown from './StyleChipDropdown';
import SizingEditor from './SizingEditor';
import { Button } from './ui/Button';
import { Input } from './ui/Input'; // I will create this component next

interface ChipEditorProps {
  chip: FormatChip;
  chipGroups: ChipGroup[];
  updateChip: (newChip: FormatChip) => void;
  closeEditor: () => void;
}

const ChipEditor: React.FC<ChipEditorProps> = ({ chip, chipGroups, updateChip, closeEditor }) => {
  const [inputValue, setInputValue] = useState(chip.value);

  const handleUpdate = () => {
    updateChip({ ...chip, value: inputValue });
    closeEditor();
  };

  const handleChipSelect = (newChip: ChipDefinition) => {
    updateChip({ ...newChip, instanceId: chip.instanceId });
    closeEditor();
  };

  const chipGroup = chipGroups.find(group => group.chips.some(c => c.id === chip.id));

  if (chip.id === 'C-truncate' || chip.id === 'C-padding') {
    return <SizingEditor chip={chip} onUpdate={updateChip} />;
  }

  if (chip.type === 'style') {
    return <StyleChipDropdown onSelect={handleChipSelect} />;
  }

  if (chipGroup && chip.type === 'element') {
    return (
      <div className="flex flex-col gap-2">
        {chipGroup.chips.map(groupChip => (
          <Button
            key={groupChip.id}
            variant="ghost"
            size="sm"
            onClick={() => handleChipSelect(groupChip)}
            className="justify-start"
          >
            {groupChip.label}
          </Button>
        ))}
      </div>
    );
  }

  if (chip.type === 'text') {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">Edit Text</p>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
          autoFocus
        />
        <Button onClick={handleUpdate} size="sm">Update</Button>
      </div>
    );
  }

  return <p className="text-sm text-slate-500">This chip has no editable properties.</p>;
};

export default ChipEditor;
