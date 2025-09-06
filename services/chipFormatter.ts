import { FormatChip } from '../types';

export const chipsToFormatString = (chips: FormatChip[]): string => {
  return chips.map(chip => chip.value).join('');
};
