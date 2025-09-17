import { GitCommit, LogPart, LogSizing, LogStyle } from '../types';
import { timeAgo, formatIsoLike, formatStrictIso } from '../lib/dateUtils.js';

const NAMED_COLORS = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
const STYLE_KEYS = ['bold', 'dim', 'ul', 'italic', 'strike', 'blink', 'reverse'];


const getReplacements = (commit: GitCommit): { [key:string]: () => string } => ({
  '%H': () => commit.hash,
  '%h': () => commit.hash.substring(0, 7),
  '%T': () => commit.treeHash,
  '%t': () => commit.treeHash.substring(0, 7),
  '%P': () => commit.parentHashes.join(' '),
  '%p': () => commit.parentHashes.map(h => h.substring(0, 7)).join(' '),
  '%an': () => commit.author.name,
  '%aN': () => commit.author.name,
  '%ae': () => commit.author.email,
  '%aE': () => commit.author.email,
  '%al': () => commit.author.email.split('@')[0],
  '%aL': () => commit.author.email.split('@')[0],
  '%ad': () => formatIsoLike(commit.author.date),
  '%ai': () => formatIsoLike(commit.author.date), // Re-using for consistency
  '%aI': () => formatStrictIso(commit.author.date),
  '%ah': () => commit.author.date.toUTCString(),
  '%as': () => commit.author.date.toISOString().slice(0, 10),
  '%at': () => Math.floor(commit.author.date.getTime() / 1000).toString(),
  '%ar': () => timeAgo(commit.author.date),
  '%cn': () => commit.committer.name,
  '%cN': () => commit.committer.name,
  '%ce': () => commit.committer.email,
  '%cE': () => commit.committer.email,
  '%cl': () => commit.committer.email.split('@')[0],
  '%cL': () => commit.committer.email.split('@')[0],
  '%cd': () => formatIsoLike(commit.committer.date),
  '%ci': () => formatIsoLike(commit.committer.date), // Re-using for consistency
  '%cI': () => formatStrictIso(commit.committer.date),
  '%ch': () => commit.committer.date.toUTCString(),
  '%cs': () => commit.committer.date.toISOString().slice(0, 10),
  '%ct': () => Math.floor(commit.committer.date.getTime() / 1000).toString(),
  '%cr': () => timeAgo(commit.committer.date),
  '%s': () => commit.subject,
  '%f': () => commit.subject.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
  '%b': () => commit.body || '',
  '%B': () => `${commit.subject}\n\n${commit.body || ''}`,
  '%e': () => commit.encoding || '',
  '%d': () => commit.refs,
  '%D': () => commit.refs.replace(/^\s*\((.*)\)\s*$/, ''),
  '%n': () => '\n',
});


export function parseLogFormat(format: string, commit: GitCommit): LogPart[] {
  const parts: LogPart[] = [];
  const replacements = getReplacements(commit);
  const replacementKeys = Object.keys(replacements);
  let currentStyle: LogStyle = {};
  let currentText = '';
  let nextPartSizing: Partial<LogSizing> | null = null;

  for (let i = 0; i < format.length; i++) {
    if (format[i] === '%') {

      // Sizing Placeholders: %<(<n>), %>((<n>), etc.
      const sizingMatch = format.substring(i).match(/^%(<|>|><)\s*\(\s*(\d+)\s*(?:,\s*(l?trunc|mtrunc))?\s*\)/);
      if (sizingMatch) {
        if (currentText) {
          parts.push({ text: currentText, style: { ...currentStyle } });
          currentText = '';
        }
        const [, direction, widthStr, truncateStr] = sizingMatch;
        const width = parseInt(widthStr, 10);

        let padding: LogSizing['padding'] = 'none';
        if (direction === '<') padding = 'right';
        else if (direction === '>') padding = 'left';
        else if (direction === '><') padding = 'both';

        let truncate: LogSizing['truncate'] = 'none';
        if (truncateStr === 'trunc') truncate = 'right';
        else if (truncateStr === 'ltrunc') truncate = 'left';
        else if (truncateStr === 'mtrunc') truncate = 'middle';

        nextPartSizing = { width, padding, truncate };
        i += sizingMatch[0].length - 1;
        continue;
      }

      // Color Placeholder: %C(...)
      if (format.startsWith('%C(', i)) {
        if (currentText) {
          parts.push({ text: currentText, style: { ...currentStyle } });
          currentText = '';
        }
        const closingParen = format.indexOf(')', i + 3);
        if (closingParen !== -1) {
          const key = format.substring(i + 3, closingParen);
          if (key === 'reset') {
            currentStyle = {};
          } else if (key.startsWith('#') && /^#[0-9a-fA-F]{6}$/.test(key)) {
            currentStyle.color = key;
          } else if (NAMED_COLORS.includes(key)) {
            currentStyle.color = key;
          } else if (STYLE_KEYS.includes(key)) {
            (currentStyle as Partial<Record<typeof STYLE_KEYS[number], boolean>>)[key] = true;
          }
          i = closingParen;
          continue;
        }
      }

      // Data placeholder by finding the longest match
      let matchedPlaceholder = '';
      for (const key of replacementKeys) {
        if (format.startsWith(key, i)) {
          if (key.length > matchedPlaceholder.length) {
            matchedPlaceholder = key;
          }
        }
      }

      if (matchedPlaceholder) {
        if (currentText) {
          parts.push({ text: currentText, style: { ...currentStyle } });
          currentText = '';
        }

        const styleForPart = { ...currentStyle };
        if (nextPartSizing) {
          styleForPart.sizing = nextPartSizing;
          nextPartSizing = null;
        }

        parts.push({ text: replacements[matchedPlaceholder](), style: styleForPart });
        i += matchedPlaceholder.length - 1;
        continue;
      }
    }

    currentText += format[i];
  }

  if (currentText) {
    parts.push({ text: currentText, style: { ...currentStyle } });
  }

  return parts;
}
