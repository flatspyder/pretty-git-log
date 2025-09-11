
import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card } from './ui/Card';
import { WrapText } from 'lucide-react';

interface LogDisplayProps {
  lines: string[];
  wrapLines: boolean;
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
  auto: 'text-accent font-bold', // %C(auto) is used for refs, we'll make it cyan.
};

const STYLE_MAP: { [key: string]: string } = {
  bold: 'font-bold',
  dim: 'opacity-50',
  ul: 'underline',
  italic: 'italic',
  strike: 'line-through',
  blink: 'animate-pulse',
  reverse: 'bg-light text-surface',
};

/**
 * Parses a single formatted log line containing color codes (`%C(...)`)
 * and returns an array of JSX elements with appropriate styling.
 * @param line - The raw formatted string for a single commit.
 * @returns An array of React fragments and spans for rendering.
 */
const parseLineToJsx = (line: string): JSX.Element[] => {
  const parts = line.split(/(%C\(.*?\)|\%<\|.*?\(.*?\)|\%>\|.*?\(.*?\))/g).filter(Boolean);
  
  let currentClasses: Set<string> = new Set();
  const elements: JSX.Element[] = [];
  let sizing: { width: number; type: 'truncate' | 'pad_left' | 'pad_right' } | null = null;

  parts.forEach((part, index) => {
    if (part.startsWith('%C(') && part.endsWith(')')) {
      const key = part.substring(3, part.length - 1);
      if (key === 'reset') {
        currentClasses.clear();
      } else if (COLOR_MAP[key]) {
        // Remove other color classes before adding a new one
        Object.values(COLOR_MAP).forEach(c => {
          if (c) c.split(' ').forEach(cl => currentClasses.delete(cl));
        });
        COLOR_MAP[key].split(' ').forEach(c => currentClasses.add(c));
      } else if (STYLE_MAP[key]) {
        currentClasses.add(STYLE_MAP[key]);
      }
    } else if (part.startsWith('%<|(') || part.startsWith('%>|(')) {
      const match = part.match(/([<>])\|.*?\((\d+)\)/);
      if (match) {
        const type = match[1] === '<' ? 'truncate' : 'pad_left';
        const width = parseInt(match[2], 10);
        sizing = { width, type };
      }
    } else {
      let text = part;
      if (sizing) {
        if (sizing.type === 'truncate') {
          text = text.slice(0, sizing.width);
        } else if (sizing.type === 'pad_left') {
          text = text.padStart(sizing.width);
        }
        sizing = null;
      }
      elements.push(
        <span key={index} className={Array.from(currentClasses).join(' ')}>
          {text}
        </span>
      );
    }
  });

  return elements;
};

const LogDisplay: React.FC<LogDisplayProps> = ({ lines, wrapLines }) => {
  const [isWrapped, setWrapLines] = useState(wrapLines);

  return (
    <Card className="p-0 bg-zinc-950 shadow-lg">
      <div className="flex items-center px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <p className="flex-1 text-center text-xs font-medium text-zinc-400">bash</p>
        <button
            onClick={() => setWrapLines(!isWrapped)}
            className={clsx(
              'p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800',
              isWrapped && 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500'
            )}
            title="Toggle line wrap"
          >
            <WrapText size={16} />
          </button>
      </div>
    <div className="bg-zinc-950 text-zinc-100 p-4 font-mono text-sm overflow-auto">
      <pre
        className={clsx({
          'whitespace-pre': !isWrapped,
          'whitespace-pre-wrap break-words': isWrapped,
        })}
      >
        <code>
          {lines.map((line, index) => (
            <div key={index} className="leading-relaxed">
              {parseLineToJsx(line)}
            </div>
          ))}
        </code>
      </pre>
    </div>
    </Card>
  );
};

export default LogDisplay;
