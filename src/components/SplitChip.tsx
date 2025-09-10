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
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-full">
        <Chip>
          <Icon className="w-4 h-4" />
          <span>{title}</span>
        </Chip>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <PlusCircle className="w-4 h-4" />
            <span className="sr-only">Add {title} Chip</span>
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select a {title} token</DropdownMenuLabel>
        <DropdownMenuSeparator />
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
