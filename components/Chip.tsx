import React from 'react';
import { useDrag } from 'react-dnd';
import { Chip as ChipType } from '../types.js';
import { ItemTypes } from '../constants.js';

interface ChipProps {
  chip: ChipType;
}

const Chip: React.FC<ChipProps> = ({ chip }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CHIP,
    item: { ...chip, id: chip.id.includes('-') ? chip.id : `${chip.id}-${Date.now()}` },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const categoryColor = {
    Element: 'bg-sky-500 hover:bg-sky-600',
    Color: 'bg-rose-500 hover:bg-rose-600',
    Other: 'bg-slate-500 hover:bg-slate-600',
  };

  return (
    <div
      ref={drag}
      title={chip.description}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`px-3 py-1 m-1 rounded-full text-sm font-medium text-white shadow-md cursor-grab transition-colors duration-200 ${categoryColor[chip.category]}`}
    >
      {chip.label}
    </div>
  );
};

export default Chip;
