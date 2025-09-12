import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { FormatChip, ChipGroup, ChipDefinition } from '../types';
import { Chip } from './ui/Chip';
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover';
import ChipEditor from './ChipEditor';
import {
  GripVertical,
  User,
  UserCheck,
  GitCommit,
  Hash,
  MoreHorizontal,
  FileText,
  Palette,
  TextCursorInput,
} from 'lucide-react';

const ICONS: { [key: string]: React.ElementType } = {
  Author: User,
  Committer: UserCheck,
  'Subject & Body': FileText,
  Hash: Hash,
  Refs: GitCommit,
  Misc: MoreHorizontal,
};

const ITEM_TYPE = 'chip';

interface DraggableChipProps {
  chip: FormatChip;
  index: number;
  moveChip: (dragIndex: number, hoverIndex: number) => void;
  removeChip: (index: number) => void;
  updateChip: (index: number, newChip: FormatChip) => void;
  chipGroups: ChipGroup[];
  isSelected: boolean;
  onSelect: (instanceId: string | null) => void;
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
  isSelected,
  onSelect,
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

  const getChipIcon = () => {
    if (chip.type === 'style') return Palette;
    if (chip.type === 'text' || chip.id.startsWith('literal-') || chip.id === 'space') {
      return TextCursorInput;
    }
    const chipGroup = chipGroups.find(group => group.chips.some(c => c.id === chip.id));
    if (chipGroup && ICONS[chipGroup.title]) {
      return ICONS[chipGroup.title];
    }
    return GitCommit; // fallback icon
  };

  const Icon = getChipIcon();

  const getChipDisplay = () => {
    if (chip.id === 'C-truncate' || chip.id === 'C-padding') {
      const match = chip.value.match(/\((\d+)\)/);
      const value = match ? match[1] : '';
      return (
        <>
          <Icon size={14} className={clsx("mr-1.5", isOpen ? "text-white/80" : "text-slate-500")} />
          <span>{chip.label}:</span>
          <span className="ml-1.5 font-mono">{value}</span>
        </>
      );
    }

    if (chip.type === 'text' || chip.id.startsWith('literal-')) {
      return (
        <>
          <Icon size={14} className={clsx("mr-1.5", isOpen ? "text-white/80" : "text-slate-500")} />
          <span className="font-mono">"{chip.value}"</span>
        </>
      );
    }

    if (chip.id === 'space') {
      return (
        <>
          <Icon size={14} className={clsx("mr-1.5", isOpen ? "text-white/80" : "text-slate-500")} />
          <span className="italic text-slate-500">Space</span>
        </>
      );
    }

    // Default for element and style chips
    return (
      <>
        <Icon size={14} className={clsx("mr-1.5", isOpen ? "text-white/80" : "text-slate-500")} />
        <span>{chip.label}</span>
      </>
    );
  };

  const handleUpdate = (newChip: FormatChip) => {
    updateChip(index, newChip);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <motion.div
        ref={ref}
        data-testid={`chip-${chip.id}`}
        layout="position"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: isDragging ? 1.05 : 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 35,
        }}
        className={clsx(isDragging ? 'ring-2 ring-indigo-400 rounded-full' : 'ring-0')}
      >
        <PopoverTrigger asChild>
          <Chip
            ref={preview}
            variant={isOpen ? 'active' : 'default'}
            onRemove={() => removeChip(index)}
            className="cursor-pointer text-xs"
            onClick={() => onSelect(chip.instanceId)}
          >
            <div ref={drag} className="cursor-move pr-1.5" aria-label={`Drag ${chip.label} chip`}>
              <GripVertical className="h-4 w-4 text-slate-400" />
            </div>
            {getChipDisplay()}
          </Chip>
        </PopoverTrigger>
      </motion.div>
      <PopoverContent className={
        (chip.id === 'C-truncate' || chip.id === 'C-padding' || chip.type === 'style')
          ? 'w-auto p-0'
          : 'w-auto'
      }>
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
