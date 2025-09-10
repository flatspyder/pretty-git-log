import React, { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { FormatChip } from '../types';
import DraggableChip from './DraggableChip';
import Card from './Card';
import SectionHeading from './SectionHeading';
import { ELEMENT_CHIP_GROUPS, STYLE_CHIPS } from '../constants';

interface FormatBuilderProps {
  chips: FormatChip[];
  setChips: React.Dispatch<React.SetStateAction<FormatChip[]>>;
  updateChip: (index: number, newChip: FormatChip) => void;
}

const FormatBuilder: React.FC<FormatBuilderProps> = ({ chips, setChips, updateChip }) => {
  const [editingChipIndex, setEditingChipIndex] = useState<number | null>(null);

  const removeChip = (index: number) => {
    setChips(prev => prev.filter((_, i) => i !== index));
  };

  const moveChip = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newChips = [...chips];
      const [draggedChip] = newChips.splice(dragIndex, 1);
      newChips.splice(hoverIndex, 0, draggedChip);
      setChips(newChips);
    },
    [chips, setChips]
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'chip',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), []);

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <SectionHeading className="mb-4">Current Format</SectionHeading>
        <div
          ref={drop}
          className={clsx(
            'flex flex-wrap gap-2 p-4 rounded-xl border-2 border-dashed min-h-24 transition-colors',
            isOver
              ? 'border-indigo-400/80 bg-indigo-50/20 dark:bg-indigo-500/10'
              : 'border-slate-300/80 dark:border-zinc-700/60'
          )}
        >
          {chips.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-slate-500 dark:text-zinc-500">
                Drag tokens from the palette above to build your format.
              </p>
            </div>
          )}
          <AnimatePresence>
            {chips.map((chip, idx) => (
              <DraggableChip
                key={chip.id} // Use stable ID
                index={idx}
                chip={chip}
                moveChip={moveChip}
                removeChip={() => removeChip(idx)}
                updateChip={(newChip) => updateChip(idx, newChip)}
                isEditing={editingChipIndex === idx}
                setEditing={setEditingChipIndex}
                chipGroups={[...ELEMENT_CHIP_GROUPS, ...STYLE_CHIPS]}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};

export default FormatBuilder;
