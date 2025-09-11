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
  const isSelected = chips.some(c => c.id === selectedChipId);

  const handleSelect = (chip: ChipDefinition) => {
    onSelectChip(chip.id);
    onSelect(chip);
  };

  return (
    <DropdownMenu onOpenChange={(open) => !open && onSelectChip(null)}>
      <DropdownMenuTrigger asChild>
        <Chip
          variant={isSelected ? 'active' : 'default'}
          onClick={() => onSelectChip(chips[0].id)}
          className="cursor-pointer"
        >
          <Icon size={14} className={isSelected ? 'text-white' : 'text-slate-400'} />
          <span>{title}</span>
          <span className="sr-only">Add {title} chip</span>
        </Chip>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {chips.map(chip => (
          <DropdownMenuItem
            key={chip.id}
            onClick={() => handleSelect(chip)}
            onMouseEnter={() => onSelectChip(chip.id)}
          >
            {chip.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SplitChip;
