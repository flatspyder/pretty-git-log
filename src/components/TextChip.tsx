import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { ChipDefinition } from '../types';
import { TextCursorInput } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import PopoverChip from './ui/PopoverChip';

interface TextChipProps {
  onSelect: (chip: ChipDefinition) => void;
  onSelectChip: (id: string | null) => void;
}

const TextChip: React.FC<TextChipProps> = ({ onSelect, onSelectChip }) => {
  const [textValue, setTextValue] = useState('');

  return (
    <PopoverChip
      icon={TextCursorInput}
      label="Text"
      onChipClick={() => onSelectChip('text-chip')}
      onOpenChange={open => {
        if (!open) onSelectChip(null);
      }}
      popoverContentClassName="w-auto"
    >
      {close => {
        const handleAdd = () => {
          if (!textValue) return;
          onSelect({
            id: `text-${nanoid()}`,
            type: 'text',
            label: 'Text',
            value: textValue,
          });
          setTextValue('');
          close();
        };

        return (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-text-primary">
              Enter custom text
            </p>
            <Input
              type="text"
              value={textValue}
              onChange={e => setTextValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="e.g. 'commit: '"
              autoFocus
            />
            <Button onClick={handleAdd} size="sm" variant="secondary">
              Add Chip
            </Button>
          </div>
        );
      }}
    </PopoverChip>
  );
};

export default TextChip;
