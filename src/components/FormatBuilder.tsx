import React, { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { FormatChip } from '../types';
import DraggableChip from './DraggableChip';
import { PRESET_FORMATS, ELEMENT_CHIP_GROUPS, STYLE_CHIPS } from '../constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { clsx } from 'clsx';

interface FormatBuilderProps {
  chips: FormatChip[];
  setChips: React.Dispatch<React.SetStateAction<FormatChip[]>>;
  updateChip: (index: number, newChip: FormatChip) => void;
}

const FormatBuilder: React.FC<FormatBuilderProps> = ({ chips, setChips, updateChip }) => {
  const [editingChipIndex, setEditingChipIndex] = useState<number | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'chip', // This should match the type from DraggableChip
    drop: () => ({ name: 'FormatBuilder' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));


  const removeChip = (index: number) => {
    setChips(prev => prev.filter((_, i) => i !== index));
  };

  const moveChip = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragChip = chips[dragIndex];
      setChips(prevChips => {
        const newChips = [...prevChips];
        newChips.splice(dragIndex, 1);
        newChips.splice(hoverIndex, 0, dragChip);
        return newChips;
      });
    },
    [chips, setChips]
  );

  const applyPreset = (formatName: string) => {
    setChips(PRESET_FORMATS[formatName]);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Current Format</CardTitle>
            <CardDescription>This is the dropzone for your format tokens.</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500 dark:text-slate-400">Presets:</span>
            <Button variant="link" size="sm" onClick={() => applyPreset('oneline')}>oneline</Button>
            <Button variant="link" size="sm" onClick={() => applyPreset('short')}>short</Button>
            <Button variant="link" size="sm" onClick={() => applyPreset('medium')}>medium</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={drop}
          className={clsx(
            'flex flex-wrap gap-2 rounded-xl border-2 border-dashed border-slate-300/60 dark:border-white/10 p-4 min-h-32 transition-all',
            { 'ring-2 ring-indigo-400/70 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900': isOver }
          )}
        >
          {chips.length > 0 ? (
            chips.map((chip, idx) => (
              <DraggableChip
                key={chip.id + idx}
                index={idx}
                chip={chip}
                moveChip={moveChip}
                removeChip={removeChip}
                updateChip={updateChip}
                isEditing={editingChipIndex === idx}
                setEditing={setEditingChipIndex}
                chipGroups={[...ELEMENT_CHIP_GROUPS, ...STYLE_CHIPS]}
              />
            ))
          ) : (
            <div className="w-full flex items-center justify-center">
              <p className="text-slate-400 dark:text-slate-500">
                Drag tokens here to build your format string.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormatBuilder;
