import React from 'react';
import { ChipDefinition } from '../types';
import {
  User,
  UserCheck,
  GitCommit,
  Hash,
  MoreHorizontal,
  FileText,
} from 'lucide-react';
import { Button } from './ui/Button';
import PopoverChip from './ui/PopoverChip';

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

  return (
    <PopoverChip
      icon={Icon}
      label={title}
      onChipClick={() => onSelectChip(chips[0].id)}
      onOpenChange={open => {
        if (!open) onSelectChip(null);
      }}
      popoverContentClassName="w-auto p-0"
    >
      {close => (
        <div
          className="flex flex-col gap-1 p-1"
          onMouseLeave={() => onSelectChip(null)}
        >
          {chips.map(chip => (
            <Button
              key={chip.id}
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => {
                onSelect(chip);
                close();
              }}
              onMouseEnter={() => onSelectChip(chip.id)}
            >
              {chip.label}
            </Button>
          ))}
        </div>
      )}
    </PopoverChip>
  );
};

export default SplitChip;
