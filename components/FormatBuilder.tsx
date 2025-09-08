import React, { useCallback } from 'react';
import { FormatChip } from '../types';
import DraggableChip from './DraggableChip';

interface FormatBuilderProps {
  chips: FormatChip[];
  setChips: React.Dispatch<React.SetStateAction<FormatChip[]>>;
}

const FormatBuilder: React.FC<FormatBuilderProps> = ({ chips, setChips }) => {
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
    <div className="w-full max-w-4xl mb-8">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">2. Build Your Format</h2>
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 p-2 bg-slate-800 border border-slate-700 rounded min-h-[42px]">
          {chips.map((chip, idx) => (
            <DraggableChip
              key={chip.id + idx}
              index={idx}
              chip={chip}
              moveChip={moveChip}
              removeChip={removeChip}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormatBuilder;
