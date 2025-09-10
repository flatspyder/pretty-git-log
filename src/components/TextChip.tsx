import React from 'react';
import { nanoid } from 'nanoid';
import { FormatChip } from '../types';
import { Chip } from './ui/Chip';
import { Button } from './ui/Button';
import { TextCursorInput, PlusCircle } from 'lucide-react';

interface TextChipProps {
  onSelect: (chip: FormatChip) => void;
}

const TextChip: React.FC<TextChipProps> = ({ onSelect }) => {
  const handleAdd = () => {
    onSelect({ id: `text-${nanoid()}`, type: 'text', label: 'Text', value: ' ' });
  };

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-full">
      <Chip>
        <TextCursorInput className="w-4 h-4" />
        <span>Text</span>
      </Chip>
      <Button variant="ghost" size="icon" onClick={handleAdd} className="h-6 w-6">
        <PlusCircle className="w-4 h-4" />
        <span className="sr-only">Add Text Chip</span>
      </Button>
    </div>
  );
};

export default TextChip;
