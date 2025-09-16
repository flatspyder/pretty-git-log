import React, { useState } from 'react';
import { ChipDefinition, LogSizing } from '../types';
import { Button } from './ui/Button';
import { Minus, Plus } from 'lucide-react';

interface SizingChipControlProps {
  chipDef: ChipDefinition;
  onSelect: (chip: ChipDefinition) => void;
}

const SizingChipControl: React.FC<SizingChipControlProps> = ({ chipDef, onSelect }) => {
  const [width, setWidth] = useState(chipDef.sizing?.width || 10);

  const handleSelect = () => {
    // Create a new chip definition with the current width
    const newSizing: Partial<LogSizing> = { ...chipDef.sizing, width };

    let value = chipDef.value;
    if (newSizing) {
        const isTruncate = newSizing.truncate === 'right';
        if (newSizing.padding === 'left') {
            value = `%>(${width})`;
        } else if (newSizing.padding === 'right') {
            value = `%<(${width}${isTruncate ? ',trunc' : ''})`;
        } else if (newSizing.padding === 'both') {
            value = `%><(${width}${isTruncate ? ',trunc' : ''})`;
        } else if (isTruncate) {
            value = `%<(${width},trunc)`;
        }
    }

    const newChipDef: ChipDefinition = {
      ...chipDef,
      value,
      sizing: newSizing,
    };
    onSelect(newChipDef);
  };

  const increment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWidth(w => w + 1);
  };

  const decrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWidth(w => Math.max(1, w - 1));
  };

  return (
    <div className="flex items-center justify-between w-full text-sm">
      <Button variant="ghost" className="flex-1 justify-start" onClick={handleSelect}>
        {chipDef.label}
      </Button>
      <div className="flex items-center p-1 border rounded-md bg-background">
        <Button variant="ghost" size="icon" onClick={decrement}>
          <Minus className="h-4 w-4" />
        </Button>
        <div className="px-3 font-mono tabular-nums">{width}</div>
        <Button variant="ghost" size="icon" onClick={increment}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SizingChipControl;
