
export interface GitCommit {
  hash: string;
  treeHash: string;
  parentHashes: string[];
  author: {
    name: string;
    email: string;
    date: Date;
  };
  committer: {
    name: string;
    email: string;
    date: Date;
  };
  subject: string;
  body?: string;
  refs: string;
  encoding?: string;
}

export type ChipCategory = 'Element' | 'Color' | 'Other';

export interface Chip {
  id: string;
  label: string;
  value: string;
  category: ChipCategory;
  description: string;
}
