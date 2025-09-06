import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Chip as ChipType } from '../types.js';
import DraggableChip from './DraggableChip.js';
import { ItemTypes } from '../constants.js';

interface ChipEditorProps {
  chips: ChipType[];
  setChips: (chips: ChipType[]) => void;
}

const ChipEditor: React.FC<ChipEditorProps> = ({ chips, setChips }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CHIP,
    drop: (item: ChipType) => {
        if (!chips.find(c => c.id === item.id)) {
            setChips([...chips, item]);
        }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveChip = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragChip = chips[dragIndex];
    const newChips = [...chips];
    newChips.splice(dragIndex, 1);
    newChips.splice(hoverIndex, 0, dragChip);
    setChips(newChips);
  }, [chips, setChips]);

  const removeChip = (index: number) => {
    const newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);
  }

  return (
    <div
      ref={drop}
      className={`p-4 bg-slate-800 border-2 border-dashed rounded-lg min-h-[100px] flex flex-wrap items-start transition-colors duration-200 ${isOver ? 'border-cyan-400' : 'border-slate-600'}`}
    >
      {chips.length === 0 && (
        <p className="text-slate-500 w-full text-center self-center">
          Drop chips here to build your format string.
        </p>
      )}
      {chips.map((chip, index) => (
        <DraggableChip
            key={chip.id}
            index={index}
            chip={chip}
            moveChip={moveChip}
            removeChip={removeChip}
        />
      ))}
    </div>
  );
};

export default ChipEditor;
