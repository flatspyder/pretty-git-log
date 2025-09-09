import React, { useRef, useState, useEffect } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { FormatChip, ChipGroup } from '../types';
import { colorMap } from '../services/colorUtils';
import StyleChipDropdown from './StyleChipDropdown';
import SizingEditor from './SizingEditor';

const ITEM_TYPE = 'chip';

interface DraggableChipProps {
  chip: FormatChip;
  index: number;
  moveChip: (dragIndex: number, hoverIndex: number) => void;
  removeChip: (index: number) => void;
  updateChip: (index: number, newChip: FormatChip) => void;
  isEditing: boolean;
  setEditing: (index: number | null) => void;
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
  const [inputValue, setInputValue] = useState(chip.value);

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

  const getColorClassName = () => {
    if (chip.type !== 'style') return 'bg-surface-hover';
    const colorMatch = chip.value.match(/%C\(([^)]+)\)/);
    if (colorMatch && colorMatch[1] !== 'reset' && colorMatch[1] !== 'normal' && colorMatch[1] !== 'default') {
      const color = colorMatch[1];
      return colorMap[color] || 'bg-surface-hover';
    }
    return 'bg-surface-hover';
  };

  const findChipGroup = () => {
    if (chip.type === 'text' || chip.id === 'space') return null;
    return chipGroups.find(group => group.chips.some(c => c.id === chip.id));
  };

  const handleChipSelect = (newChip: FormatChip) => {
    updateChip(index, newChip);
    setEditing(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateChip(index, { ...chip, value: inputValue });
    setEditing(null);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const chipGroup = findChipGroup();

  const getChipParts = () => {
    if (chip.id === 'C-truncate' || chip.id === 'C-padding') {
      const match = chip.value.match(/\((\d+)\)/);
      const value = match ? match[1] : '';
      return { type: chip.label, variant: value };
    }
    if (chip.type === 'text') {
      return { type: 'Text', variant: chip.value };
    }
    if (chip.id.startsWith('literal-')) {
      return { type: 'Literal', variant: chip.label };
    }
    if (chip.id === 'space') {
      return { type: 'Space', variant: '' };
    }
    if (chip.label && chip.label.includes(': ')) {
      const parts = chip.label.split(': ');
      return { type: parts[0], variant: parts[1] || '' };
    }
    const parts = chip.label ? chip.label.split(' ') : [];
    const type = parts[0] || '';
    const variant = parts.slice(1).join(' ');
    return { type, variant };
  };

  const { type, variant } = getChipParts();

  return (
    <div className="relative" ref={ref} data-testid={`chip-${chip.id}`}>
      <div
        style={{ opacity }}
          className="flex items-center bg-surface text-light rounded text-sm overflow-hidden border border-border"
      >
        <div ref={dragRef} className="px-2 py-1 cursor-move bg-surface-muted">
          {type}
        </div>
        <div
          className={`px-2 py-1 border-l border-r border-border ${getColorClassName()}`}
          onClick={() => (chipGroup || chip.type === 'text') && setEditing(index)}
        >
          {isEditing && chip.type === 'text' ? (
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              className="bg-transparent text-light outline-none"
              autoFocus
              data-testid="text-chip-input"
            />
          ) : (
            variant.trim() ? variant : <>&nbsp;</>
          )}
        </div>
        <button onClick={() => removeChip(index)} className="px-2 py-1 text-danger hover:bg-surface-muted">
          &times;
        </button>
      </div>
      {isEditing && (chip.id === 'C-truncate' || chip.id === 'C-padding') ? (
        <div ref={dropdownRef} className="absolute left-0 mt-2 z-10">
          <SizingEditor chip={chip} onUpdate={(newChip) => updateChip(index, newChip)} />
        </div>
      ) : isEditing && chip.type === 'style' ? (
        <div ref={dropdownRef}>
          <StyleChipDropdown onSelect={handleChipSelect} />
        </div>
      ) : isEditing && chipGroup && chip.type === 'element' ? (
        <div
          ref={dropdownRef}
          className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-surface-muted ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        >
          <div className="py-1">
            {chipGroup.chips.map(groupChip => (
              <a
                href="#"
                key={groupChip.id}
                className="text-light block px-4 py-2 text-sm hover:bg-surface-hover"
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
      ) : null}
    </div>
  );
};

export default DraggableChip;
