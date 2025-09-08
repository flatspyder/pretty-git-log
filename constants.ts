import { GitCommit } from './types';

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
  {
    hash: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0a1b2',
    treeHash: 'a9f8e7d6c5b4a3b2a1f0e9d8c7b6a5f4e3d2c1b0',
    parentHashes: ['b4c5d6e7f8a9b0a1b2c3d4e5f6a7b8c9d0e1f2a3'],
    author: {
      name: 'Grace Hopper',
      email: 'grace@example.com',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    committer: {
      name: 'Grace Hopper',
      email: 'grace@example.com',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    subject: 'style: Refactor UI components for better readability',
    refs: ' (tag: v1.1.0)',
  },
  {
    hash: 'b4c5d6e7f8a9b0a1b2c3d4e5f6a7b8c9d0e1f2a3',
    treeHash: 'e3d2c1b0a9f8e7d6c5b4a3b2a1f0e9d8c7b6a5f4',
    parentHashes: ['d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4', 'a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9'],
    author: {
      name: 'Linus Torvalds',
      email: 'linus@example.com',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    committer: {
      name: 'Linus Torvalds',
      email: 'linus@example.com',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    subject: 'Merge pull request #42 from feature/new-data-source',
    refs: '',
  },
  {
    hash: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4',
    treeHash: 'd2c1b0a9f8e7d6c5b4a3b2a1f0e9d8c7b6a5f4e3',
    parentHashes: ['e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4d5'],
    author: {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    committer: {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    subject: 'fix: Correct placeholder replacement logic',
    refs: '',
  },
  {
    hash: 'e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4d5',
    treeHash: 'c1b0a9f8e7d6c5b4a3b2a1f0e9d8c7b6a5f4e3d2',
    parentHashes: ['f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4d5e6'],
    author: {
      name: 'Margaret Hamilton',
      email: 'margaret@example.com',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    },
    committer: {
      name: 'Margaret Hamilton',
      email: 'margaret@example.com',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
    subject: 'docs: Update README with usage instructions',
    refs: ' (tag: v1.0.0)',
  },
  {
    hash: 'f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4d5e6',
    treeHash: 'b0a9f8e7d6c5b4a3b2a1f0e9d8c7b6a5f4e3d2c1',
    parentHashes: [],
    author: {
      name: 'Chris Wanstrath',
      email: 'chris@example.com',
      date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 5 weeks ago
    },
    committer: {
      name: 'Chris Wanstrath',
      email: 'chris@example.com',
      date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    },
    subject: 'Initial commit',
    refs: '',
  },
];

import { ChipGroup, FormatChip } from './types';

export const HASH_CHIPS: ChipGroup = {
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

export const AUTHOR_CHIPS: ChipGroup = {
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

export const COMMITTER_CHIPS: ChipGroup = {
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

export const SUBJECT_BODY_CHIPS: ChipGroup = {
  title: 'Subject & Body',
  chips: [
    { id: 's', label: 'Subject', value: '%s' },
    { id: 'f', label: 'Subject sanitized', value: '%f' },
    { id: 'b', label: 'Body', value: '%b' },
    { id: 'B', label: 'Subject and body', value: '%B' },
  ],
};

export const REFS_CHIPS: ChipGroup = {
  title: 'Refs',
  chips: [
    { id: 'd', label: 'Decorations', value: '%d' },
    { id: 'D', label: 'Decorations (plain)', value: '%D' },
  ],
};

export const MISC_CHIPS: ChipGroup = {
  title: 'Misc',
  chips: [
    { id: 'e', label: 'Encoding', value: '%e' },
    { id: 'n', label: 'Newline', value: '%n' },
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

export const STYLE_CHIPS: ChipGroup = {
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

const spaceChip: FormatChip = { id: 'space', label: ' ', value: ' ' };

export const PRESET_FORMATS: { [key: string]: FormatChip[] } = {
  oneline: [
    { ...HASH_CHIPS.chips.find(c => c.id === 'h')! },
    spaceChip,
    { ...SUBJECT_BODY_CHIPS.chips.find(c => c.id === 's')! },
  ],
  short: [
    { id: 'literal-commit', label: 'commit ', value: 'commit ' },
    { ...HASH_CHIPS.chips.find(c => c.id === 'h')! },
    spaceChip,
    { id: 'literal-author', label: 'Author: ', value: 'Author: ' },
    { ...AUTHOR_CHIPS.chips.find(c => c.id === 'an')! },
    spaceChip,
    { ...SUBJECT_BODY_CHIPS.chips.find(c => c.id === 's')! },
  ],
  medium: [
    { id: 'literal-commit', label: 'commit ', value: 'commit ' },
    { ...HASH_CHIPS.chips.find(c => c.id === 'h')! },
    spaceChip,
    { id: 'literal-author', label: 'Author: ', value: 'Author: ' },
    { ...AUTHOR_CHIPS.chips.find(c => c.id === 'an')! },
    spaceChip,
    { id: 'literal-date', label: 'Date: ', value: 'Date: ' },
    { ...AUTHOR_CHIPS.chips.find(c => c.id === 'ad')! },
    { ...MISC_CHIPS.chips.find(c => c.id === 'n')! },
    { ...SUBJECT_BODY_CHIPS.chips.find(c => c.id === 's')! },
    { ...MISC_CHIPS.chips.find(c => c.id === 'n')! },
    { ...SUBJECT_BODY_CHIPS.chips.find(c => c.id === 'b')! },
  ],
};
