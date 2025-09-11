import { test } from 'node:test';
import assert from 'node:assert/strict';
// @ts-ignore
import { chipsToFormatString } from '../src/services/chipFormatter.js';
// @ts-ignore
import { FormatChip } from '../src/types.js';

test('converts chips to format string', () => {
  const chips: FormatChip[] = [
    { id: 'h', instanceId: '1', type: 'element', label: 'Hash: short', value: '%h' },
    { id: 'C-yellow', instanceId: '2', type: 'style', label: 'Color: yellow', value: '%C(yellow)' },
    { id: 's', instanceId: '3', type: 'element', label: 'Subject', value: '%s' },
  ];
  assert.equal(chipsToFormatString(chips), '%h%C(yellow)%s');
});

test('includes plain text chips', () => {
  const chips: FormatChip[] = [
    { id: 'text-1', instanceId: '1', type: 'text', label: 'hello', value: 'hello' },
    { id: 'h', instanceId: '2', type: 'element', label: 'Hash: short', value: '%h' },
  ];
  assert.equal(chipsToFormatString(chips), 'hello%h');
});
