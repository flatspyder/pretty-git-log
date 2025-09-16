import React, { useState, useEffect } from 'react';
import { FormatChip, LogSizing } from '../types';
import { Button } from './ui/Button';
import { Minus, Plus, ArrowLeftRight, ArrowRightLeft, Scissors } from 'lucide-react';
import { clsx } from 'clsx';
import { Switch } from './ui/Switch';
import { Label } from './ui/Label';

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
    if (chip.sizing) {
      setSizing(chip.sizing);
    }
  }, [chip.sizing]);

  const handleUpdate = (newSizing: Partial<LogSizing>) => {
    // Reconstruct the value string from the sizing object
    let value = '';
    const width = newSizing.width || 10;
    const isTruncate = newSizing.truncate === 'right';

    if (newSizing.padding === 'left') {
      value = `%>(${width})`;
    } else if (newSizing.padding === 'right') {
      value = ` %<(${width}${isTruncate ? ',trunc' : ''})`;
    } else if (newSizing.padding === 'both') {
        value = ` %><(${width}${isTruncate ? ',trunc' : ''})`;
    } else if (isTruncate) {
        value = ` %<(${width},trunc)`;
    }

    onUpdate({ ...chip, value, sizing: newSizing });
    setSizing(newSizing);
  };

  const setWidth = (newWidth: number) => {
    if (newWidth < 1) return;
    handleUpdate({ ...sizing, width: newWidth });
  };

  const setPadding = (newPadding: 'left' | 'right' | 'both' | 'none') => {
    handleUpdate({ ...sizing, padding: newPadding, truncate: 'none' }); // Padding and truncate are mutually exclusive in this UI
  };

  const setTruncate = (isTruncated: boolean) => {
    handleUpdate({ ...sizing, truncate: isTruncated ? 'right' : 'none', padding: isTruncated ? 'right' : sizing.padding || 'none' });
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
        <div className="flex items-center border rounded-md">
          <Button variant="ghost" size="icon" className={clsx(sizing.padding === 'left' && 'bg-surface-hover')} onClick={() => setPadding('left')}>
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className={clsx(sizing.padding === 'right' && 'bg-surface-hover')} onClick={() => setPadding('right')}>
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
       <div className="flex items-center justify-between">
        <Label htmlFor="truncate-switch">Truncate</Label>
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
