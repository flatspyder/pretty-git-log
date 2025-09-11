import React from 'react';
import { nanoid } from 'nanoid';
import { FormatChip } from '../types';
import { Chip } from './ui/Chip';
import { TextCursorInput } from 'lucide-react';

interface TextChipProps {
  onSelect: (chip: FormatChip) => void;
}

const TextChip: React.FC<TextChipProps> = ({ onSelect }) => {
  const handleAdd = () => {
    onSelect({ id: `text-${nanoid()}`, type: 'text', label: 'Text', value: ' ' });
  };

  return (
    <Chip onClick={handleAdd}>
      <TextCursorInput size={14} className="text-slate-400" />
      Text
      <span className="sr-only">Add Text Chip</span>
    </Chip>
  );
};

export default TextChip;
