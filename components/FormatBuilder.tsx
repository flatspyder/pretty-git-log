import React, { useState, useEffect } from 'react';
import { FormatChip } from '../types';
import { chipsToFormatString } from '../services/chipFormatter';
import SplitChip from './SplitChip';
import StyleChip from './StyleChip';

interface ChipGroup {
  title: string;
  chips: FormatChip[];
}

const HASH_CHIPS: ChipGroup = {
  title: 'Hash',
  chips: [
    { id: 'H', label: 'Hash: full', value: '%H' },
    { id: 'h', label: 'Hash: short', value: '%h' },
    { id: 'T', label: 'Tree hash: full', value: '%T' },
    { id: 't', label: 'Tree hash: short', value: '%t' },
    { id: 'P', label: 'Parent hashes: full', value: '%P' },
    { id: 'p', label: 'Parent hashes: short', value: '%p' },
  ],
};

const AUTHOR_CHIPS: ChipGroup = {
  title: 'Author',
  chips: [
    { id: 'an', label: 'Author name', value: '%an' },
    { id: 'ae', label: 'Author email', value: '%ae' },
    { id: 'al', label: 'Author local-part', value: '%al' },
    { id: 'ad', label: 'Author date', value: '%ad' },
    { id: 'ai', label: 'Author date ISO-like', value: '%ai' },
    { id: 'aI', label: 'Author date strict ISO', value: '%aI' },
    { id: 'ah', label: 'Author date human', value: '%ah' },
    { id: 'as', label: 'Author date short', value: '%as' },
    { id: 'at', label: 'Author date UNIX', value: '%at' },
    { id: 'ar', label: 'Author date relative', value: '%ar' },
  ],
};

const COMMITTER_CHIPS: ChipGroup = {
  title: 'Committer',
  chips: [
    { id: 'cn', label: 'Committer name', value: '%cn' },
    { id: 'ce', label: 'Committer email', value: '%ce' },
    { id: 'cl', label: 'Committer local-part', value: '%cl' },
    { id: 'cd', label: 'Committer date', value: '%cd' },
    { id: 'ci', label: 'Committer date ISO-like', value: '%ci' },
    { id: 'cI', label: 'Committer date strict ISO', value: '%cI' },
    { id: 'ch', label: 'Committer date human', value: '%ch' },
    { id: 'cs', label: 'Committer date short', value: '%cs' },
    { id: 'ct', label: 'Committer date UNIX', value: '%ct' },
    { id: 'cr', label: 'Committer date relative', value: '%cr' },
  ],
};

const SUBJECT_BODY_CHIPS: ChipGroup = {
  title: 'Subject & Body',
  chips: [
    { id: 's', label: 'Subject', value: '%s' },
    { id: 'f', label: 'Subject sanitized', value: '%f' },
    { id: 'b', label: 'Body', value: '%b' },
    { id: 'B', label: 'Subject and body', value: '%B' },
  ],
};

const REFS_CHIPS: ChipGroup = {
  title: 'Refs',
  chips: [
    { id: 'd', label: 'Decorations', value: '%d' },
    { id: 'D', label: 'Decorations (plain)', value: '%D' },
  ],
};

const MISC_CHIPS: ChipGroup = {
  title: 'Misc',
  chips: [
    { id: 'e', label: 'Encoding', value: '%e' },
    { id: 'n', label: 'Newline', value: '%n' },
  ],
};

const ELEMENT_CHIP_GROUPS: ChipGroup[] = [
  HASH_CHIPS,
  AUTHOR_CHIPS,
  COMMITTER_CHIPS,
  SUBJECT_BODY_CHIPS,
  REFS_CHIPS,
  MISC_CHIPS,
];

const STYLE_CHIPS: ChipGroup = {
  title: 'Colors',
  chips: [
    { id: 'C-normal', label: 'Color: normal', value: '%C(normal)' },
    { id: 'C-black', label: 'Color: black', value: '%C(black)' },
    { id: 'C-red', label: 'Color: red', value: '%C(red)' },
    { id: 'C-green', label: 'Color: green', value: '%C(green)' },
    { id: 'C-yellow', label: 'Color: yellow', value: '%C(yellow)' },
    { id: 'C-blue', label: 'Color: blue', value: '%C(blue)' },
    { id: 'C-magenta', label: 'Color: magenta', value: '%C(magenta)' },
    { id: 'C-cyan', label: 'Color: cyan', value: '%C(cyan)' },
    { id: 'C-white', label: 'Color: white', value: '%C(white)' },
    { id: 'C-default', label: 'Color: default', value: '%C(default)' },
    { id: 'C-reset', label: 'Reset color', value: '%C(reset)' },
  ],
};

interface FormatBuilderProps {
  onChange: (format: string) => void;
}

const FormatBuilder: React.FC<FormatBuilderProps> = ({ onChange }) => {
  const [chips, setChips] = useState<FormatChip[]>([]);

  useEffect(() => {
    onChange(chipsToFormatString(chips));
  }, [chips, onChange]);

  const addChip = (chip: FormatChip) => setChips(prev => [...prev, chip]);
  const removeChip = (index: number) => {
    setChips(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex mb-4">
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 p-2 bg-slate-800 border border-slate-700 rounded min-h-[42px]">
          {chips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => removeChip(idx)}
              className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-sm"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-64 ml-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-slate-400 text-xs mb-1">Elements</h3>
          {ELEMENT_CHIP_GROUPS.map(group => (
            <SplitChip
              key={group.title}
              title={group.title}
              chips={group.chips}
              onSelect={addChip}
            />
          ))}
          <h3 className="text-slate-400 text-xs mb-1 mt-2">Styles</h3>
          <StyleChip
            chips={STYLE_CHIPS.chips}
            onSelect={addChip}
          />
        </div>
      </div>
    </div>
  );
};

export default FormatBuilder;
