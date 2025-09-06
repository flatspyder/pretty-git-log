import { test } from 'node:test';
import assert from 'node:assert/strict';
// @ts-ignore
import { formatGitLog } from '../services/gitFormatter.js';
// @ts-ignore
import { GitCommit } from '../types.js';

const sampleCommit: GitCommit = {
  hash: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  treeHash: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
  parentHashes: [
    'cccccccccccccccccccccccccccccccccccccccc',
    'dddddddddddddddddddddddddddddddddddddddd',
  ],
  author: {
    name: 'Alice',
    email: 'alice@example.com',
    date: new Date('2023-01-01T12:34:56Z'),
  },
  committer: {
    name: 'Bob',
    email: 'bob@example.com',
    date: new Date('2023-02-02T00:00:00Z'),
  },
  subject: 'Initial commit',
  refs: 'HEAD -> main',
};

test('formats placeholders', () => {
  const cases: [string, string][] = [
    ['%H', sampleCommit.hash],
    ['%h', sampleCommit.hash.substring(0, 7)],
    ['%T', sampleCommit.treeHash],
    ['%t', sampleCommit.treeHash.substring(0, 7)],
    ['%P', sampleCommit.parentHashes.join(' ')],
    ['%p', sampleCommit.parentHashes.map(h => h.substring(0, 7)).join(' ')],
    ['%an', sampleCommit.author.name],
    ['%ae', sampleCommit.author.email],
    ['%ad', sampleCommit.author.date.toString()],
    ['%cn', sampleCommit.committer.name],
    ['%ce', sampleCommit.committer.email],
    ['%cd', sampleCommit.committer.date.toString()],
    ['%s', sampleCommit.subject],
    ['%d', sampleCommit.refs],
    ['%n', '\n'],
    ['%as', sampleCommit.author.date.toISOString().slice(0, 10)],
    ['%cs', sampleCommit.committer.date.toISOString().slice(0, 10)],
    ['%at', Math.floor(sampleCommit.author.date.getTime() / 1000).toString()],
    ['%ct', Math.floor(sampleCommit.committer.date.getTime() / 1000).toString()],
  ];

  for (const [fmt, expected] of cases) {
    assert.equal(formatGitLog(fmt, [sampleCommit])[0], expected);
  }
});
