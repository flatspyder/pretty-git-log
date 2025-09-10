import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { motion } from 'framer-motion';
import { FormatChip, ChipGroup } from '../types';
import { Chip } from './ui/Chip';
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover';
import ChipEditor from './ChipEditor';
import { GripVertical } from 'lucide-react';

const ITEM_TYPE = 'chip';

interface DraggableChipProps {
  chip: FormatChip;
  index: number;
  moveChip: (dragIndex: number, hoverIndex: number) => void;
  removeChip: (index: number) => void;
  updateChip: (index: number, newChip: FormatChip) => void;
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
  chipGroups,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: { id: chip.id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

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

  drop(ref);

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

  const { type: chipType, variant } = getChipParts();

  const handleUpdate = (newChip: FormatChip) => {
    updateChip(index, newChip);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <motion.div
        ref={ref}
        data-testid={`chip-${chip.id}`}
        animate={{
          scale: isDragging ? 1.05 : 1,
          boxShadow: isDragging ? '0 0 0 2px #6366f1' : '0 0 0 0px #6366f1',
        }}
        transition={{ duration: 0.2 }}
        className="rounded-full"
      >
        <PopoverTrigger asChild>
          <Chip
            ref={preview}
            variant="active"
            onRemove={() => removeChip(index)}
            className="shadow-md cursor-pointer"
          >
            <div ref={drag} className="cursor-move pr-1" aria-label={`Drag ${chipType} chip`}>
              <GripVertical className="h-4 w-4" />
            </div>
            <span className="font-semibold">{chipType}:</span>
            <span className="font-mono">{variant.trim() ? variant : `""`}</span>
          </Chip>
        </PopoverTrigger>
      </motion.div>
      <PopoverContent>
        <ChipEditor
          chip={chip}
          chipGroups={chipGroups}
          updateChip={handleUpdate}
          closeEditor={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DraggableChip;
