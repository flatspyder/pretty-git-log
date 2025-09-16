
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
  sizing?: Partial<LogSizing>;
}

export interface ChipGroup {
  title: string;
  chips: ChipDefinition[];
}

export interface LogSizing {
  width: number;
  padding: 'left' | 'right' | 'both' | 'none';
  truncate: 'left' | 'middle' | 'right' | 'none';
}

export interface LogStyle {
  color?: string;
  bgColor?: string;
  bold?: boolean;
  dim?: boolean;
  ul?: boolean;
  italic?: boolean;
  strike?: boolean;
  blink?: boolean;
  reverse?: boolean;
  sizing?: Partial<LogSizing>;
}

export interface LogPart {
  text: string;
  style: LogStyle;
}
