import React, { useState, useEffect } from 'react';
import { FormatChip } from '../types';
import { Button } from './ui/Button';
import { Minus, Plus } from 'lucide-react';

interface SizingEditorProps {
  chip: FormatChip;
  onUpdate: (newChip: FormatChip) => void;
}

const SizingEditor: React.FC<SizingEditorProps> = ({ chip, onUpdate }) => {
  const [value, setValue] = useState(8);

  useEffect(() => {
    const match = chip.value.match(/\((\d+)\)/);
    if (match) {
      setValue(parseInt(match[1], 10));
    }
  }, [chip.value]);

  const handleUpdate = (newValue: number) => {
    if (newValue < 1) return;
    const newChipValue = chip.value.replace(/\(\d+\)/, `(${newValue})`);
    onUpdate({ ...chip, value: newChipValue });
    setValue(newValue);
  };

  const increment = () => handleUpdate(value + 1);
  const decrement = () => handleUpdate(value - 1);

  return (
    <div className="flex items-center p-1" data-testid="sizing-editor">
      <Button variant="ghost" size="icon" onClick={decrement}>
        <Minus className="h-4 w-4" />
      </Button>
      <div className="px-3 text-sm font-mono tabular-nums">{value}</div>
      <Button variant="ghost" size="icon" onClick={increment}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SizingEditor;
