import { test } from 'node:test';
import assert from 'node:assert/strict';
// @ts-ignore
import { chipsToFormatString } from '../services/chipFormatter.js';
// @ts-ignore
import { FormatChip } from '../types.js';

test('converts chips to format string', () => {
  const chips: FormatChip[] = [
    { id: 'h', label: 'Hash: short', value: '%h' },
    { id: 'C-yellow', label: 'Color: yellow', value: '%C(yellow)' },
    { id: 's', label: 'Subject', value: '%s' },
  ];
  assert.equal(chipsToFormatString(chips), '%h%C(yellow)%s');
});

test('includes plain text chips', () => {
  const chips: FormatChip[] = [
    { id: 'text-1', label: 'hello', value: 'hello' },
    { id: 'h', label: 'Hash: short', value: '%h' },
  ];
  assert.equal(chipsToFormatString(chips), 'hello%h');
});
