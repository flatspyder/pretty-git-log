import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseLogFormat } from '../src/services/logParser.js';
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

test('parses data placeholders', () => {
  const format = '%h %s';
  const result = parseLogFormat(format, sampleCommit);

  assert.deepStrictEqual(result, [
    { text: 'aaaaaaa', style: {} },
    { text: ' ', style: {} },
    { text: 'Initial commit', style: {} }
  ]);
});

test('parses style placeholders', () => {
  const format = '%C(yellow)%h%C(reset) %C(bold)%s%C(reset)';
  const result = parseLogFormat(format, sampleCommit);

  assert.deepStrictEqual(result, [
    { text: 'aaaaaaa', style: { color: 'yellow' } },
    { text: ' ', style: {} },
    { text: 'Initial commit', style: { bold: true } }
  ]);
});

test('handles mixed content and multiple styles', () => {
  const format = 'Commit %C(yellow)%h%C(reset) by %C(bold)%an%C(reset) was %C(cyan)cool%C(reset).';
  const result = parseLogFormat(format, sampleCommit);

  assert.deepStrictEqual(result, [
    { text: 'Commit ', style: {} },
    { text: 'aaaaaaa', style: { color: 'yellow' } },
    { text: ' by ', style: {} },
    { text: 'Alice', style: { bold: true } },
    { text: ' was ', style: {} },
    { text: 'cool', style: { color: 'cyan' } },
    { text: '.', style: {} },
  ]);
});

test('resets style correctly', () => {
    const format = '%C(yellow)%C(bold)bold yellow%C(reset) normal';
    const result = parseLogFormat(format, sampleCommit);

    assert.deepStrictEqual(result, [
        { text: 'bold yellow', style: { color: 'yellow', bold: true } },
        { text: ' normal', style: {} }
    ]);
});

test('parses RGB hex color', () => {
    const format = '%C(#FF0000)this is red';
    const result = parseLogFormat(format, sampleCommit);

    assert.deepStrictEqual(result, [
        { text: 'this is red', style: { color: '#FF0000' } }
    ]);
});

test('parses right-padding placeholder', () => {
    const format = '%< (10)%h';
    const result = parseLogFormat(format, sampleCommit);
    assert.deepStrictEqual(result, [
        { text: 'aaaaaaa', style: { sizing: { width: 10, padding: 'right', truncate: 'none' } } }
    ]);
});

test('parses left-padding placeholder', () => {
    const format = '%>(10)%h';
    const result = parseLogFormat(format, sampleCommit);
    assert.deepStrictEqual(result, [
        { text: 'aaaaaaa', style: { sizing: { width: 10, padding: 'left', truncate: 'none' } } }
    ]);
});

test('parses truncation placeholder', () => {
    const format = '%<(10,trunc)%H';
    const result = parseLogFormat(format, sampleCommit);
    assert.deepStrictEqual(result, [
        { text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', style: { sizing: { width: 10, padding: 'right', truncate: 'right' } } }
    ]);
});
