import { GitCommit } from './types.ts';
import { nanoid } from 'nanoid';

export const DEFAULT_FORMAT = "%C(yellow)%h%C(reset) -%C(auto)%d%C(reset) %s%n  %C(green)(%ar)%C(reset) %C(bold blue)<%an>%C(reset)";

export const SYNTHETIC_LOG_DATA: GitCommit[] = [
  {
    hash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
    treeHash: 'f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3b2a1',
    parentHashes: ['c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0a1b2'],
    author: {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      date: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    },
    committer: {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      date: new Date(Date.now() - 3 * 60 * 1000),
    },
    subject: 'feat: Implement real-time format parsing',
    refs: ' (HEAD -> main, origin/main, origin/HEAD)',
  },
  // ... other commit data
];

import { ChipGroup, FormatChip } from './types.ts';

export const createElementChip = (chip: Omit<FormatChip, 'type'>): FormatChip => ({ ...chip, type: 'element' });
export const createStyleChip = (chip: Omit<FormatChip, 'type'>): FormatChip => ({ ...chip, type: 'style' });
export const createTextChip = (value: string): FormatChip => ({
  id: `text-${nanoid()}`,
  type: 'text',
  value,
  label: 'Text',
});


export const HASH_CHIPS: ChipGroup = {
  title: 'Hash',
  chips: [
    createElementChip({ id: 'H', label: 'Hash: full', value: '%H' }),
    createElementChip({ id: 'h', label: 'Hash: short', value: '%h' }),
    createElementChip({ id: 'T', label: 'Tree hash: full', value: '%T' }),
    createElementChip({ id: 't', label: 'Tree hash: short', value: '%t' }),
    createElementChip({ id: 'P', label: 'Parent hashes: full', value: '%P' }),
    createElementChip({ id: 'p', label: 'Parent hashes: short', value: '%p' }),
  ],
};

export const AUTHOR_CHIPS: ChipGroup = {
  title: 'Author',
  chips: [
    createElementChip({ id: 'an', label: 'Author name', value: '%an' }),
    createElementChip({ id: 'ae', label: 'Author email', value: '%ae' }),
    // ... other author chips
  ],
};

export const COMMITTER_CHIPS: ChipGroup = {
  title: 'Committer',
  chips: [
    createElementChip({ id: 'cn', label: 'Committer name', value: '%cn' }),
    createElementChip({ id: 'ce', label: 'Committer email', value: '%ce' }),
    // ... other committer chips
  ],
};

export const SUBJECT_BODY_CHIPS: ChipGroup = {
  title: 'Subject & Body',
  chips: [
    createElementChip({ id: 's', label: 'Subject', value: '%s' }),
    createElementChip({ id: 'f', label: 'Subject sanitized', value: '%f' }),
    createElementChip({ id: 'b', label: 'Body', value: '%b' }),
    createElementChip({ id: 'B', label: 'Subject and body', value: '%B' }),
  ],
};

export const REFS_CHIPS: ChipGroup = {
  title: 'Refs',
  chips: [
    createElementChip({ id: 'd', label: 'Decorations', value: '%d' }),
    createElementChip({ id: 'D', label: 'Decorations (plain)', value: '%D' }),
  ],
};

export const MISC_CHIPS: ChipGroup = {
  title: 'Misc',
  chips: [
    createElementChip({ id: 'e', label: 'Encoding', value: '%e' }),
    createElementChip({ id: 'n', label: 'Newline', value: '%n' }),
  ],
};

export const ELEMENT_CHIP_GROUPS: ChipGroup[] = [
  HASH_CHIPS,
  AUTHOR_CHIPS,
  COMMITTER_CHIPS,
  SUBJECT_BODY_CHIPS,
  REFS_CHIPS,
  MISC_CHIPS,
];

export const COLOR_CHIPS: ChipGroup = {
  title: 'Colors',
  chips: [
    createStyleChip({ id: 'C-normal', label: 'Color: normal', value: '%C(normal)' }),
    createStyleChip({ id: 'C-black', label: 'Color: black', value: '%C(black)' }),
    // ... other color chips
  ],
};

export const EFFECT_CHIPS: ChipGroup = {
  title: 'Effects',
  chips: [
    createStyleChip({ id: 'C-bold', label: 'Bold', value: '%C(bold)' }),
    createStyleChip({ id: 'C-dim', label: 'Dim', value: '%C(dim)' }),
    // ... other effect chips
  ],
};

export const SIZING_CHIPS: ChipGroup = {
  title: 'Sizing',
  chips: [
    createStyleChip({ id: 'C-truncate', label: 'Truncate', value: '%<|(8)' }),
    createStyleChip({ id: 'C-padding', label: 'Padding', value: '%>|(8)' }),
  ],
};

export const STYLE_CHIPS: ChipGroup[] = [
  COLOR_CHIPS,
  EFFECT_CHIPS,
  SIZING_CHIPS,
];

const spaceChip: FormatChip = createTextChip(' ');

export const PRESET_FORMATS: { [key: string]: FormatChip[] } = {
  oneline: [
    { ...COLOR_CHIPS.chips.find(c => c.id === 'C-yellow')! },
    { ...HASH_CHIPS.chips.find(c => c.id === 'h')! },
    { ...COLOR_CHIPS.chips.find(c => c.id === 'C-reset')! },
    spaceChip,
    { ...SUBJECT_BODY_CHIPS.chips.find(c => c.id === 's')! },
  ],
  short: [
    // ... other presets
  ],
  medium: [
    // ... other presets
  ],
  full: [
    // ... other presets
  ],
  graph: [
    // ... other presets
  ],
};
