import React from 'react';
import { FormatChip } from '../types';
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
  chips: FormatChip[];
  onSelect: (chip: FormatChip) => void;
}

const ICONS: { [key: string]: React.ElementType } = {
  Author: User,
  Committer: UserCheck,
 'Subject & Body': FileText,
  Hash: Hash,
  Misc: MoreHorizontal,
};

const SplitChip: React.FC<SplitChipProps> = ({ title, chips, onSelect }) => {
  const Icon = ICONS[title] || GitCommit;

  const handleSelect = (chip: FormatChip) => {
    onSelect(chip);
  };

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Chip>
            <Icon size={14} className="text-slate-400" />
            <span>{title}</span>
            <span className="sr-only">Add {title} chip</span>
          </Chip>
        </DropdownMenuTrigger>
      <DropdownMenuContent>
        {chips.map(chip => (
          <DropdownMenuItem key={chip.id} onClick={() => handleSelect(chip)}>
            {chip.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SplitChip;
