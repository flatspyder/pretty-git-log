import React, { useRef, useState, useEffect } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { FormatChip, ChipGroup } from '../types';
import { colorMap, getContrastingTextColor } from '../services/colorUtils';

const ITEM_TYPE = 'chip';

interface DraggableChipProps {
  chip: FormatChip;
  index: number;
  moveChip: (dragIndex: number, hoverIndex: number) => void;
  removeChip: (index: number) => void;
  updateChip: (index: number, newChip: FormatChip) => void;
  isEditing: boolean;
  setEditing: () => void;
  chipGroups: ChipGroup[];
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableChip: React.FC<DraggableChipProps> = ({
  chip,
  index,
  moveChip,
  removeChip,
  updateChip,
  isEditing,
  setEditing,
  chipGroups,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem, void, unknown>({
    accept: ITEM_TYPE,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
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

  drag(dragRef);
  drop(ref);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isEditing &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setEditing(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, setEditing]);

  const opacity = isDragging ? 0 : 1;

  const getColorStyle = () => {
    const colorMatch = chip.value.match(/%C\(([^)]+)\)/);
    if (colorMatch && colorMatch[1] !== 'reset' && colorMatch[1] !== 'normal' && colorMatch[1] !== 'default') {
      const color = colorMatch[1];
      const backgroundColor = colorMap[color] || color;
      const textColor = getContrastingTextColor(color);
      return { backgroundColor, color: textColor };
    }
    return {};
  };

  const findChipGroup = () => {
    if (chip.id.startsWith('literal-') || chip.id === 'space') return null;
    return chipGroups.find(group => group.chips.some(c => c.id === chip.id));
  };

  const handleChipSelect = (newChip: FormatChip) => {
    updateChip(index, newChip);
    setEditing(null);
  };

  const chipGroup = findChipGroup();

  const getChipParts = () => {
    if (chip.id.startsWith('literal-')) {
      return { type: 'Literal', variant: chip.label };
    }
    if (chip.id === 'space') {
      return { type: 'Space', variant: '' };
    }
    const parts = chip.label.split(': ');
    return { type: parts[0], variant: parts[1] || '' };
  };

  const { type, variant } = getChipParts();

  return (
    <div className="relative" ref={ref}>
      <div
        style={{ opacity }}
        className="flex items-center bg-slate-800 text-slate-200 rounded text-sm overflow-hidden border border-slate-700"
      >
        <div ref={dragRef} className="px-2 py-1 cursor-move bg-slate-700">
          {type}
        </div>
        <div
          style={getColorStyle()}
          className="px-2 py-1 bg-slate-600 border-l border-r border-slate-700"
          onClick={() => chipGroup && setEditing()}
        >
          {variant}
        </div>
        <button onClick={() => removeChip(index)} className="px-2 py-1 text-red-500 hover:bg-slate-700">
          &times;
        </button>
      </div>
      {isEditing && chipGroup && (
        <div
          ref={dropdownRef}
          className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        >
          <div className="py-1">
            {chipGroup.chips.map(groupChip => (
              <a
                href="#"
                key={groupChip.id}
                className="text-slate-200 block px-4 py-2 text-sm hover:bg-slate-600"
                onClick={(e) => {
                  e.preventDefault();
                  handleChipSelect(groupChip);
                }}
              >
                {groupChip.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DraggableChip;
