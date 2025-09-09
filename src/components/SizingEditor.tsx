import React, { useState, useEffect } from 'react';
import { FormatChip } from '../types';

interface SizingEditorProps {
  chip: FormatChip;
  onUpdate: (newChip: FormatChip) => void;
}

const SizingEditor: React.FC<SizingEditorProps> = ({ chip, onUpdate }) => {
  const [value, setValue] = useState(20);

  useEffect(() => {
    const match = chip.value.match(/\((\d+)\)/);
    if (match) {
      setValue(parseInt(match[1], 10));
    }
  }, [chip.value]);

  const handleUpdate = (newValue: number) => {
    const newChipValue = chip.value.replace(/\(\d+\)/, `(${newValue})`);
    onUpdate({ ...chip, value: newChipValue });
    setValue(newValue);
  };

  const increment = () => {
    handleUpdate(value + 1);
  };

  const decrement = () => {
    if (value > 1) {
      handleUpdate(value - 1);
    }
  };

  return (
    <div className="flex items-center" data-testid="sizing-editor">
      <button onClick={decrement} className="px-2 py-1 bg-surface-hover rounded-l-md">-</button>
      <div className="px-2 py-1 bg-surface">{value}</div>
      <button onClick={increment} className="px-2 py-1 bg-surface-hover rounded-r-md">+</button>
    </div>
  );
};

export default SizingEditor;
