import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { ChipDefinition } from '../types';
import { Chip } from './ui/Chip';
import { TextCursorInput } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface TextChipProps {
  onSelect: (chip: ChipDefinition) => void;
  onSelectChip: (id: string | null) => void;
}

const TextChip: React.FC<TextChipProps> = ({
  onSelect,
  onSelectChip,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [textValue, setTextValue] = useState('');

  const handleAdd = () => {
    if (!textValue) return;
    onSelect({ id: `text-${nanoid()}`, type: 'text', label: 'Text', value: textValue });
    setIsOpen(false);
    setTextValue('');
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        if (!open) onSelectChip(null);
      }}
    >
      <PopoverTrigger asChild>
        <Chip
          variant={isOpen ? 'active' : 'default'}
          onClick={() => onSelectChip('text-chip')}
          className="cursor-pointer"
        >
          <TextCursorInput
            size={14}
            className={isOpen ? 'text-white' : 'text-slate-400'}
          />
          Text
          <span className="sr-only">Add Text Chip</span>
        </Chip>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
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
      </PopoverContent>
    </Popover>
  );
};

export default TextChip;
