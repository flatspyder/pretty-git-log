import React from 'react';
import { nanoid } from 'nanoid';
import { FormatChip } from '../types';

interface TextChipProps {
  onSelect: (chip: FormatChip) => void;
}

const TextChip: React.FC<TextChipProps> = ({ onSelect }) => {
  const handleClick = () => {
    onSelect({ id: `text-${nanoid()}`, type: 'text', label: 'Text', value: '[ ' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-3 py-1 rounded-md border border-surface-hover bg-surface-muted text-sm font-medium text-light hover:bg-surface-hover"
    >
      Text
    </button>
  );
};

export default TextChip;
