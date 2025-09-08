import { test } from 'node:test';
import assert from 'node:assert/strict';
// @ts-ignore
import { formatGitLog } from '../src/services/gitFormatter.js';
// @ts-ignore
import { GitCommit } from '../src/types.js';

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
  refs: ' (HEAD -> main)',
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
    ['%aN', sampleCommit.author.name],
    ['%ae', sampleCommit.author.email],
    ['%aE', sampleCommit.author.email],
    ['%al', 'alice'],
    ['%aL', 'alice'],
    ['%ad', sampleCommit.author.date.toString()],
    ['%ai', '2023-01-01 12:34:56 +0000'],
    ['%aI', '2023-01-01T12:34:56+00:00'],
    ['%ah', 'Sun, 01 Jan 2023 12:34:56 GMT'],
    ['%cn', sampleCommit.committer.name],
    ['%cN', sampleCommit.committer.name],
    ['%ce', sampleCommit.committer.email],
    ['%cE', sampleCommit.committer.email],
    ['%cl', 'bob'],
    ['%cL', 'bob'],
    ['%cd', sampleCommit.committer.date.toString()],
    ['%ci', '2023-02-02 00:00:00 +0000'],
    ['%cI', '2023-02-02T00:00:00+00:00'],
    ['%ch', 'Thu, 02 Feb 2023 00:00:00 GMT'],
    ['%s', sampleCommit.subject],
    ['%d', sampleCommit.refs],
    ['%D', 'HEAD -> main'],
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

test('formats message and body placeholders', () => {
  const commitWithBody: GitCommit = {
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
    subject: 'feat: This is a test commit with /slashes/',
    body: 'This is the first line of the body.\n\nThis is the second, after a blank line.',
    refs: 'HEAD -> main',
    encoding: 'UTF-8',
  };

  const cases: [string, string][] = [
    ['%f', 'feat-This-is-a-test-commit-with-slashes'],
    ['%b', commitWithBody.body!],
    ['%B', `${commitWithBody.subject}\n\n${commitWithBody.body}`],
    ['%e', commitWithBody.encoding!],
  ];

  for (const [fmt, expected] of cases) {
    assert.equal(formatGitLog(fmt, [commitWithBody])[0], expected);
  }
});
