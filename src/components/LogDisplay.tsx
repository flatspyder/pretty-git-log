
import React from 'react';

interface LogDisplayProps {
  lines: string[];
}

// Maps Git's color names to corresponding Tailwind CSS classes.
const COLOR_MAP: { [key: string]: string } = {
  normal: '',
  reset: '',
  default: '',
  black: 'text-muted',
  red: 'text-red-500',
  green: 'text-green-500',
  yellow: 'text-yellow-400',
  blue: 'text-blue-400',
  magenta: 'text-pink-500',
  cyan: 'text-accent',
  white: 'text-light',
  'bold black': 'text-secondary font-bold',
  'bold red': 'text-red-400 font-bold',
  'bold green': 'text-green-400 font-bold',
  'bold yellow': 'text-yellow-300 font-bold',
  'bold blue': 'text-blue-300 font-bold',
  'bold magenta': 'text-pink-400 font-bold',
  'bold cyan': 'text-accent font-bold',
  'bold white': 'text-white font-bold',
  auto: 'text-accent font-bold', // %C(auto) is used for refs, we'll make it cyan.
};

/**
 * Parses a single formatted log line containing color codes (`%C(...)`)
 * and returns an array of JSX elements with appropriate styling.
 * @param line - The raw formatted string for a single commit.
 * @returns An array of React fragments and spans for rendering.
 */
const parseLineToJsx = (line: string): JSX.Element[] => {
  // Split the string by color directives, keeping the directives in the array.
  const parts = line.split(/(%C\(.*?\)|\%C\(reset\))/g).filter(Boolean);
  
  let currentClasses: string[] = [];
  const elements: JSX.Element[] = [];

  parts.forEach((part, index) => {
    if (part.startsWith('%C(') && part.endsWith(')')) {
      if (part === '%C(reset)') {
        currentClasses = []; // Reset all styles
      } else {
        const colorKey = part.substring(3, part.length - 1);
        if (COLOR_MAP[colorKey] !== undefined) {
          // In real git, colors stack. Here we simplify to one color class at a time for clarity.
          currentClasses = COLOR_MAP[colorKey].split(' ');
        }
      }
    } else {
      // It's a regular text part, apply the current style.
      elements.push(
        <span key={index} className={currentClasses.join(' ')}>
          {part}
        </span>
      );
    }
  });

  return elements;
};

const LogDisplay: React.FC<LogDisplayProps> = ({ lines }) => {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-lg mt-6 w-full max-w-4xl mx-auto">
      <div className="bg-surface-muted/50 px-4 py-2 rounded-t-lg text-xs text-secondary font-sans">
        Formatted Git Log Output
      </div>
      <pre className="p-4 text-sm font-mono overflow-x-auto">
        <code>
          {lines.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap break-words">
              {parseLineToJsx(line)}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default LogDisplay;
