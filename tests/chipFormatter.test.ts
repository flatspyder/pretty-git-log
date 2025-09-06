import { test } from 'node:test';
import assert from 'node:assert/strict';
// @ts-ignore
import { chipsToFormatString } from '../services/chipFormatter.js';
// @ts-ignore
import { FormatChip } from '../types.js';

test('converts chips to format string', () => {
  const chips: FormatChip[] = [
    { id: 'h', label: '%h', value: '%h', group: 'element' },
    { id: 'C-yellow', label: '%C(yellow)', value: '%C(yellow)', group: 'style' },
    { id: 's', label: '%s', value: '%s', group: 'element' },
  ];
  assert.equal(chipsToFormatString(chips), '%h%C(yellow)%s');
});
