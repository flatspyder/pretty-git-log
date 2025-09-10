import React from 'react';
import { nanoid } from 'nanoid';
import { FormatChip } from '../types';
import { Chip } from './ui/Chip';
import { TextCursorInput } from 'lucide-react';

interface TextChipProps {
  onSelect: (chip: FormatChip) => void;
}

const TextChip: React.FC<TextChipProps> = ({ onSelect }) => {
  const handleClick = () => {
    onSelect({ id: `text-${nanoid()}`, type: 'text', label: 'Text', value: ' ' });
  };

  return (
    <Chip as="button" onClick={handleClick} className="cursor-pointer">
      <TextCursorInput className="w-4 h-4 mr-1" />
      Text
    </Chip>
  );
};

export default TextChip;
