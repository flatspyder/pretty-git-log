import React from 'react';
import { ChipDefinition } from '../types';
import { User, UserCheck, GitCommit, Hash, MoreHorizontal, FileText } from 'lucide-react';
import { Chip } from './ui/Chip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/Popover';
import { Button } from './ui/Button';

interface SplitChipProps {
  title: string;
  chips: ChipDefinition[];
  onSelect: (chip: ChipDefinition) => void;
  onSelectChip: (id: string | null) => void;
}

const ICONS: { [key: string]: React.ElementType } = {
  Author: User,
  Committer: UserCheck,
  'Subject & Body': FileText,
  Hash: Hash,
  Misc: MoreHorizontal,
};

const SplitChip: React.FC<SplitChipProps> = ({
  title,
  chips,
  onSelect,
  onSelectChip,
}) => {
  const Icon = ICONS[title] || GitCommit;
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (chip: ChipDefinition) => {
    onSelect(chip);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) onSelectChip(null);
    }}>
      <PopoverTrigger asChild>
        <Chip
          variant={isOpen ? 'active' : 'default'}
          onClick={() => onSelectChip(chips[0].id)}
          className="cursor-pointer"
        >
          <Icon size={14} className={isOpen ? 'text-white' : 'text-slate-400'} />
          <span>{title}</span>
          <span className="sr-only">Add {title} chip</span>
        </Chip>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex flex-col gap-1 p-1" onMouseLeave={() => onSelectChip(null)}>
          {chips.map(chip => (
            <Button
              key={chip.id}
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => handleSelect(chip)}
              onMouseEnter={() => onSelectChip(chip.id)}
            >
              {chip.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SplitChip;
