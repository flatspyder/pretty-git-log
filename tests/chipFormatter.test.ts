import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatChipsToString, parseStringToChips } from '../services/chipFormatter.js';
import { Chip } from '../types.js';

test('formatChipsToString', () => {
  const chips: Chip[] = [
    { id: 'h', label: 'Short Hash', value: '%h', category: 'Element', description: '' },
    { id: 'space', label: 'Space', value: ' ', category: 'Other', description: '' },
    { id: 's', label: 'Subject', value: '%s', category: 'Element', description: '' },
  ];
  const expected = '%h %s';
  assert.equal(formatChipsToString(chips), expected);
});

test('parseStringToChips', () => {
  const formatString = '%C(yellow)%h%C(reset) %s';
  const chips = parseStringToChips(formatString);

  assert.equal(chips.length, 5);
  assert.equal(chips[0].value, '%C(yellow)');
  assert.equal(chips[1].value, '%h');
  assert.equal(chips[2].value, '%C(reset)');
  assert.equal(chips[3].value, ' ');
  assert.equal(chips[4].value, '%s');
});

test('parseStringToChips and formatChipsToString roundtrip', () => {
    const formatString = '%C(yellow)%h%C(reset) -%C(auto)%d%C(reset) %s%n  %C(green)(%ar)%C(reset) %C(bold blue)<%an>%C(reset)';
    const chips = parseStringToChips(formatString);
    const newFormatString = formatChipsToString(chips);
    assert.equal(newFormatString, formatString);
});
