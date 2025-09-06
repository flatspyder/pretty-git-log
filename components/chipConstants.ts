import { Chip } from '../types.js';

export const AVAILABLE_CHIPS: Chip[] = [
  // Commit Hash
  { id: 'h', label: 'Short Hash', value: '%h', category: 'Element', description: 'Abbreviated commit hash' },
  { id: 'H', label: 'Full Hash', value: '%H', category: 'Element', description: 'Full commit hash' },
  { id: 't', label: 'Short Tree Hash', value: '%t', category: 'Element', description: 'Abbreviated tree hash' },
  { id: 'T', label: 'Full Tree Hash', value: '%T', category: 'Element', description: 'Full tree hash' },

  // Author
  { id: 'an', label: 'Author Name', value: '%an', category: 'Element', description: 'Author name' },
  { id: 'ae', label: 'Author Email', value: '%ae', category: 'Element', description: 'Author email' },
  { id: 'ad', label: 'Author Date', value: '%ad', category: 'Element', description: 'Author date (format respects --date= option)' },
  { id: 'ar', label: 'Author Date, relative', value: '%ar', category: 'Element', description: 'Author date, relative' },
  { id: 'at', label: 'Author Date, UNIX timestamp', value: '%at', category: 'Element', description: 'Author date, UNIX timestamp' },
  { id: 'ai', label: 'Author Date, ISO 8601-like', value: '%ai', category: 'Element', description: 'Author date, ISO 8601-like format' },

  // Committer
  { id: 'cn', label: 'Committer Name', value: '%cn', category: 'Element', description: 'Committer name' },
  { id: 'ce', label: 'Committer Email', value: '%ce', category: 'Element', description: 'Committer email' },
  { id: 'cd', label: 'Committer Date', value: '%cd', category: 'Element', description: 'Committer date' },
  { id: 'cr', label: 'Committer Date, relative', value: '%cr', category: 'Element', description: 'Committer date, relative' },

  // Subject & Body
  { id: 's', label: 'Subject', value: '%s', category: 'Element', description: 'Subject' },
  { id: 'f', label: 'Sanitized Subject', value: '%f', category: 'Element', description: 'Subject, suitable for a filename' },
  { id: 'b', label: 'Body', value: '%b', category: 'Element', description: 'Body' },
  { id: 'B', label: 'Raw Body', value: '%B', category: 'Element', description: 'Raw body (unwrapped subject and body)' },

  // Refs
  { id: 'd', label: 'Ref names', value: '%d', category: 'Element', description: 'Ref names, like "(HEAD -> master, origin/master)"' },
  { id: 'D', label: 'Ref names, no parens', value: '%D', category: 'Element', description: 'Ref names without wrapping' },

  // Other
  { id: 'n', label: 'New-line', value: '%n', category: 'Other', description: 'A newline character' },
  { id: 'space', label: 'Space', value: ' ', category: 'Other', description: 'A space character' },
  { id: 'tab', label: 'Tab', value: '\t', category: 'Other', description: 'A tab character' },

  // Colors
  { id: 'Cnormal', label: 'Color Normal', value: '%C(normal)', category: 'Color', description: 'Switch to normal color' },
  { id: 'Creset', label: 'Color Reset', value: '%C(reset)', category: 'Color', description: 'Reset color' },
  { id: 'Cblue', label: 'Blue', value: '%C(blue)', category: 'Color', description: 'Switch to blue' },
  { id: 'Cgreen', label: 'Green', value: '%C(green)', category: 'Color', description: 'Switch to green' },
  { id: 'Cyellow', label: 'Yellow', value: '%C(yellow)', category: 'Color', description: 'Switch to yellow' },
  { id: 'Cred', label: 'Red', value: '%C(red)', category: 'Color', description: 'Switch to red' },
];
