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
