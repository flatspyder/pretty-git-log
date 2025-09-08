import React from 'react';
import { nanoid } from 'nanoid';
import { FormatChip } from '../types';

interface TextChipProps {
  onSelect: (chip: FormatChip) => void;
}

const TextChip: React.FC<TextChipProps> = ({ onSelect }) => {
  const handleClick = () => {
    const text = window.prompt('Enter text to insert');
    if (text !== null && text !== '') {
      onSelect({ id: `text-${nanoid()}`, label: text, value: text });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-3 py-1 rounded-md border border-slate-600 bg-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-600"
    >
      Text
    </button>
  );
};

export default TextChip;
