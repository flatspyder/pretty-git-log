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
    '%ae': () => commit.author.email,
    '%ad': () => commit.author.date.toString(),
    '%ar': () => timeAgo(commit.author.date),
    '%cn': () => commit.committer.name,
    '%ce': () => commit.committer.email,
    '%cd': () => commit.committer.date.toString(),
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
