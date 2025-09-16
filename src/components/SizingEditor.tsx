import React, { useState, useEffect } from 'react';
import { FormatChip, LogSizing } from '../types';
import { Button } from './ui/Button';
import { Minus, Plus } from 'lucide-react';
import { Label } from './ui/Label';
import { Switch } from './ui/Switch';
import {
  ToggleGroup,
  ToggleGroupItem,
} from './ui/ToggleGroup';

interface SizingEditorProps {
  chip: FormatChip;
  onUpdate: (newChip: FormatChip) => void;
}

const SizingEditor: React.FC<SizingEditorProps> = ({ chip, onUpdate }) => {
  const [sizing, setSizing] = useState<Partial<LogSizing>>({
    width: 10,
    padding: 'none',
    truncate: 'none',
  });

  useEffect(() => {
    // Initialize state from the chip's sizing object
    if (chip.sizing) {
      setSizing(prev => ({ ...prev, ...chip.sizing }));
    }
  }, [chip.sizing]);

  const handleUpdate = (newSizing: Partial<LogSizing>) => {
    // Reconstruct the value string from the sizing object
    let value = '';
    const width = newSizing.width || 10;
    const isTruncate = newSizing.truncate === 'right';

    // The format string depends on the combination of padding and truncation
    if (newSizing.padding === 'left') {
      value = `%>(${width})`;
    } else if (newSizing.padding === 'right' || isTruncate) {
      // Both right-padding and truncation use the %< placeholder
      value = `%<(${width}${isTruncate ? ',trunc' : ''})`;
    } else if (newSizing.padding === 'both') {
      value = `%><(${width})`;
    }

    // Update the parent component
    onUpdate({ ...chip, value, sizing: newSizing });
    setSizing(newSizing);
  };

  const setWidth = (newWidth: number) => {
    if (newWidth < 1) return;
    handleUpdate({ ...sizing, width: newWidth });
  };

  const setPadding = (newPadding: 'left' | 'right' | 'both' | 'none') => {
    // If turning off padding, set to 'none'. Otherwise, set the new value.
    const paddingValue = sizing.padding === newPadding ? 'none' : newPadding;
    handleUpdate({ ...sizing, padding: paddingValue });
  };

  const setTruncate = (isTruncated: boolean) => {
    const truncateValue = isTruncated ? 'right' : 'none';
    const paddingValue = isTruncated ? 'right' : sizing.padding;
    handleUpdate({ ...sizing, truncate: truncateValue, padding: paddingValue });
  };

  return (
    <div className="flex flex-col gap-4 p-2" data-testid="sizing-editor">
      <div className="flex items-center justify-between">
        <Label>Width</Label>
        <div className="flex items-center p-1 border rounded-md">
          <Button variant="ghost" size="icon" onClick={() => setWidth((sizing.width || 10) - 1)}>
            <Minus className="h-4 w-4" />
          </Button>
          <div className="px-3 text-sm font-mono tabular-nums">{sizing.width}</div>
          <Button variant="ghost" size="icon" onClick={() => setWidth((sizing.width || 10) + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label>Padding</Label>
        <ToggleGroup
            type="single"
            value={sizing.padding}
            onValueChange={value => setPadding(value as any)}
            className="gap-1"
        >
            <ToggleGroupItem value="left" aria-label="Pad left">L</ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Pad right">R</ToggleGroupItem>
            <ToggleGroupItem value="both" aria-label="Pad both">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="truncate-switch">Truncate Text</Label>
        <Switch
            id="truncate-switch"
            checked={sizing.truncate === 'right'}
            onCheckedChange={setTruncate}
        />
      </div>
    </div>
  );
};

export default SizingEditor;
