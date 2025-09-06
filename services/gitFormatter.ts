import { GitCommit } from '../types';

/**
 * Calculates a human-readable "time ago" string for a given date.
 * @param date - The date to compare against the current time.
 * @returns A relative time string (e.g., "5 minutes ago").
 */
function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
}

function pad(num: number): string {
  return num.toString().padStart(2, '0');
}

function timezoneOffset(date: Date): string {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const abs = Math.abs(offset);
  return `${sign}${pad(Math.floor(abs / 60))}${pad(abs % 60)}`;
}

function formatIsoLike(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${timezoneOffset(date)}`;
}

function formatStrictIso(date: Date): string {
  const tz = timezoneOffset(date);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${tz.slice(0, 3)}:${tz.slice(3)}`;
}

/**
 * Replaces Git log format placeholders in a string with data from a commit object.
 * This function handles data replacement, not color parsing.
 * @param format - The pretty format string.
 * @param commit - The Git commit object.
 * @returns A string with all data placeholders replaced.
 */
function formatCommitLine(format: string, commit: GitCommit): string {
  const replacements: { [key: string]: () => string } = {
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
    '%ad': () => commit.author.date.toString(),
    '%ai': () => formatIsoLike(commit.author.date),
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
    '%cd': () => commit.committer.date.toString(),
    '%ci': () => formatIsoLike(commit.committer.date),
    '%cI': () => formatStrictIso(commit.committer.date),
    '%ch': () => commit.committer.date.toUTCString(),
    '%cs': () => commit.committer.date.toISOString().slice(0, 10),
    '%ct': () => Math.floor(commit.committer.date.getTime() / 1000).toString(),
    '%cr': () => timeAgo(commit.committer.date),
    '%s': () => commit.subject,
    '%d': () => commit.refs,
    '%n': () => '\n', // Added newline placeholder
  };

  // Create a regex to match all placeholders, including bracketed ones.
  // This avoids recursive replacements, which is a bug in the old implementation.
  // The regex matches <...> placeholders first, then the normal %.. ones.
  const placeholderKeys = Object.keys(replacements);
  const bracketedKeys = placeholderKeys.map(k => k.substring(1));

  // Matches `<%an>` or `%h` etc. It's constructed to avoid matching things like `%C(yellow)`.
  const regex = new RegExp(`(<%(${bracketedKeys.join('|')})>)|(${placeholderKeys.join('|')})`, 'g');

  return format.replace(regex, (match, bracketedMatch, bracketedKey, normalMatch) => {
    if (bracketedMatch) {
      const key = `%${bracketedKey}`;
      if (replacements[key]) {
        return `<${replacements[key]()}>`;
      }
    }
    if (normalMatch) {
      if (replacements[normalMatch]) {
        return replacements[normalMatch]();
      }
    }
    // This case handles placeholders not in our map, like color codes, by returning them unmodified.
    return match;
  });
}

/**
 * Formats an array of Git commits using a given pretty format string.
 * @param format - The format string to apply.
 * @param commits - An array of GitCommit objects.
 * @returns An array of formatted log lines, with color codes intact.
 */
export function formatGitLog(format: string, commits: GitCommit[]): string[] {
  return commits.map(commit => formatCommitLine(format, commit));
}
