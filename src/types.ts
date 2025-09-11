
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

export interface ChipDefinition {
  id: string;
  type: 'element' | 'style' | 'text';
  label: string;
  value: string;
}

export interface FormatChip extends ChipDefinition {
  instanceId: string;
}

export interface ChipGroup {
  title: string;
  chips: ChipDefinition[];
}
