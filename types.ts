
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

export interface FormatChip {
  id: string;
  label: string;
  value: string;
  className?: string;
}
