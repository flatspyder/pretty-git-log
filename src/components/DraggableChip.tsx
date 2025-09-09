import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FormatChip, ChipGroup } from '../types';
import {
  GitCommit, GitBranch, Hash, User, Calendar, Palette, Type, Plus, X
} from 'lucide-react';

// Editor components will be refactored later
import StyleChipDropdown from './StyleChipDropdown';
import SizingEditor from './SizingEditor';

const ITEM_TYPE = 'chip';

// ... (getIconForChip function remains the same)
const getIconForChip = (chip: FormatChip) => {
  const commonProps = { size: 14 };
  if (chip.type === 'style') return <Palette {...commonProps} />;
  if (chip.type === 'text') return <Type {...commonProps} />;
  if (chip.id.includes('hash')) return <Hash {...commonProps} />;
  if (chip.id.includes('author') || chip.id.includes('committer')) return <User {...commonProps} />;
  if (chip.id.includes('date')) return <Calendar {...commonProps} />;
  if (chip.id.includes('ref-names')) return <GitBranch {...commonProps} />;
  if (chip.id.includes('body') || chip.id.includes('subject')) return <GitCommit {...commonProps} />;
  return <Plus {...commonProps} />;
};


interface DraggableChipProps {
  chip: FormatChip;
  index: number;
  moveChip: (dragIndex: number, hoverIndex: number) => void;
  removeChip: () => void;
  updateChip: (newChip: FormatChip) => void;
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

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: chip.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<DragItem>({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

      moveChip(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const chipLabel = chip.label || chip.value;
  const Icon = getIconForChip(chip);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={clsx(
        'relative group focus-within:z-10',
        isDragging && 'opacity-50'
      )}
      aria-grabbed={isDragging}
    >
      <div
        className={clsx(
            'flex items-center rounded-full border text-xs font-medium transition-all',
            isDragging && 'shadow-lg scale-105 ring-2 ring-indigo-400',
            isEditing
            ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md border-transparent ring-2 ring-indigo-300'
            : 'bg-white text-slate-700 border-slate-200 dark:bg-zinc-800/80 dark:text-slate-200 dark:border-zinc-700'
        )}
      >
        <button
            onClick={() => setEditing(index)}
            className="flex items-center gap-1 pl-2.5 py-1.5 rounded-l-full cursor-pointer hover:bg-slate-50/50 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-zinc-900"
        >
            {Icon}
            <span>{chipLabel}</span>
        </button>
        <div className="w-px h-4 bg-slate-200 dark:bg-zinc-700"></div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeChip();
          }}
          className="px-2 text-slate-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 opacity-50 group-hover:opacity-100 transition-opacity rounded-r-full hover:bg-slate-50/50 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-red-400 dark:focus-visible:ring-offset-zinc-900"
          aria-label={`Remove ${chipLabel}`}
        >
          <X size={14} />
        </button>
      </div>

      {isEditing && (
        <div className="absolute top-full left-0 mt-2 z-20 w-56">
          <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-xl border border-slate-200 dark:border-zinc-700">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 mb-2">Editing: {chipLabel}</p>
            {(chip.id === 'C-truncate' || chip.id === 'C-padding') ? (
              <SizingEditor chip={chip} onUpdate={(newChip) => updateChip(newChip)} />
            ) : chip.type === 'style' ? (
              <StyleChipDropdown onSelect={(newChip) => updateChip(newChip)} />
            ) : null}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DraggableChip;
