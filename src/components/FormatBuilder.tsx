import React, { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { FormatChip } from '../types';
import DraggableChip from './DraggableChip';
import { ELEMENT_CHIP_GROUPS, STYLE_CHIPS } from '../constants';
import { Card } from './ui/Card';
import { clsx } from 'clsx';
import SectionHeading from './SectionHeading';
import { AnimatePresence, motion } from 'framer-motion';

interface FormatBuilderProps {
  chips: FormatChip[];
  setChips: React.Dispatch<React.SetStateAction<FormatChip[]>>;
  updateChip: (index: number, newChip: FormatChip) => void;
  onSelectChip: (instanceId: string | null) => void;
}

const FormatBuilder: React.FC<FormatBuilderProps> = ({
  chips,
  setChips,
  updateChip,
  onSelectChip,
}) => {
  const [editingChipIndex, setEditingChipIndex] = useState<number | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'chip',
    drop: () => ({ name: 'FormatBuilder' }),
    collect: monitor => ({
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

  return (
    <div>
      <SectionHeading className="mb-4">Current Format</SectionHeading>
      <Card className="p-4 sm:p-6">
        <motion.div
          ref={drop}
          layout
          transition={{ duration: 0.5, type: 'spring' }}
          className={clsx(
            'flex flex-wrap gap-3 p-4 rounded-xl border-2 border-dashed min-h-24',
            isOver
              ? 'border-indigo-400/80 bg-indigo-50/20 dark:bg-indigo-500/10'
              : 'border-border/80 dark:border-border/60'
          )}
        >
          {chips.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-text-muted">
                Drag tokens from the palette above to build your format.
              </p>
            </div>
          )}
          <AnimatePresence>
            {chips.map((chip, idx) => (
              <DraggableChip
                key={chip.instanceId}
                index={idx}
                chip={chip}
                moveChip={moveChip}
                removeChip={removeChip}
                updateChip={updateChip}
                isEditing={editingChipIndex === idx}
                setEditing={setEditingChipIndex}
                chipGroups={[...ELEMENT_CHIP_GROUPS, ...STYLE_CHIPS]}
                onSelect={onSelectChip}
              />
            ))}
          </AnimatePresence>
        </motion.div>
    </Card>
    </div>
  );
};

export default FormatBuilder;
