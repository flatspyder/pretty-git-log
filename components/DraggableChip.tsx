import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { FormatChip } from '../types';

const ITEM_TYPE = 'chip';

interface DraggableChipProps {
  chip: FormatChip;
  index: number;
  moveChip: (dragIndex: number, hoverIndex: number) => void;
  removeChip: (index: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableChip: React.FC<DraggableChipProps> = ({ chip, index, moveChip, removeChip }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem, void, unknown>({
    accept: ITEM_TYPE,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveChip(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: chip.id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-sm cursor-move"
    >
      <span>{chip.label}</span>
      <button onClick={() => removeChip(index)} className="ml-2 text-red-500 hover:text-red-400">
        &times;
      </button>
    </div>
  );
};

export default DraggableChip;
