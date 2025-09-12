import React from 'react';
import { ChipDefinition } from '../types';
import { Button } from './ui/Button';
import { User, UserCheck, GitCommit, Hash, PlusCircle, MoreHorizontal, FileText } from 'lucide-react';
import { Chip } from './ui/Chip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';

interface SplitChipProps {
  title: string;
  chips: ChipDefinition[];
  onSelect: (chip: ChipDefinition) => void;
  selectedChipId: string | null;
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
  selectedChipId,
  onSelectChip,
}) => {
  const Icon = ICONS[title] || GitCommit;

  const handleSelect = (chip: ChipDefinition) => {
    onSelect(chip);
  };

  return (
    <DropdownMenu onOpenChange={(open) => !open && onSelectChip(null)}>
      <DropdownMenuTrigger asChild>
        <Chip className="cursor-pointer">
          <Icon size={14} className="text-slate-400" />
          <span>{title}</span>
          <span className="sr-only">Add {title} chip</span>
        </Chip>
      </DropdownMenuTrigger>
      <DropdownMenuContent onMouseLeave={() => onSelectChip(null)}>
        {chips.map(chip => (
          <DropdownMenuItem
            key={chip.id}
            onClick={() => handleSelect(chip)}
            onMouseEnter={() => onSelectChip(chip.id)}
            className={clsx(
              selectedChipId === chip.id &&
                'bg-gradient-to-r from-indigo-500 to-violet-500 text-white'
            )}
          >
            {chip.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SplitChip;
