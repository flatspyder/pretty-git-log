import { Chip as ChipType } from '../types.js';
import { AVAILABLE_CHIPS } from '../components/chipConstants.js';

export function formatChipsToString(chips: ChipType[]): string {
  return chips.map(chip => chip.value).join('');
}

export function parseStringToChips(formatString: string): ChipType[] {
    const regex = /(%C\([^)]+\)|%[a-zA-Z]|<%.*?>|\s+)/g;
    let lastIndex = 0;
    const chips: ChipType[] = [];
    let match;

    while ((match = regex.exec(formatString)) !== null) {
        // Add the text between placeholders as a literal chip
        if (match.index > lastIndex) {
            const text = formatString.substring(lastIndex, match.index);
            chips.push({ id: `literal-${lastIndex}`, label: text, value: text, category: 'Other', description: 'Literal text' });
        }

        const part = match[0];
        const foundChip = AVAILABLE_CHIPS.find(c => c.value === part);
        if (foundChip) {
            chips.push({ ...foundChip, id: `${foundChip.id}-${match.index}` });
        } else if (part.trim() === '') {
            chips.push({ id: `space-${match.index}`, label: 'Space', value: part, category: 'Other', description: 'A space character' });
        } else {
            // Handle unknown placeholders as literals
            chips.push({ id: `literal-${match.index}`, label: part, value: part, category: 'Other', description: 'Literal text' });
        }
        lastIndex = regex.lastIndex;
    }

    // Add any remaining text after the last placeholder
    if (lastIndex < formatString.length) {
        const text = formatString.substring(lastIndex);
        chips.push({ id: `literal-${lastIndex}`, label: text, value: text, category: 'Other', description: 'Literal text' });
    }

    return chips;
}
