import React from 'react';
import Card from './Card';

interface TerminalPreviewProps {
  lines: string[];
}

// Copied and adapted from old LogDisplay component
const COLOR_MAP: { [key: string]: string } = {
  normal: '', reset: '', default: '',
  black: 'text-zinc-500',
  red: 'text-red-400',
  green: 'text-green-400',
  yellow: 'text-yellow-400',
  blue: 'text-blue-400',
  magenta: 'text-pink-400',
  cyan: 'text-cyan-400',
  white: 'text-zinc-100',
  auto: 'text-yellow-400 font-bold', // For refs
};

const STYLE_MAP: { [key:string]: string } = {
  bold: 'font-bold',
  dim: 'opacity-60',
  ul: 'underline',
  italic: 'italic',
  strike: 'line-through',
  blink: 'animate-pulse',
  reverse: 'bg-zinc-200 text-zinc-900',
};

const parseLineToJsx = (line: string): JSX.Element[] => {
    // This regex is simplified and might not cover all edge cases of the original
    const parts = line.split(/(%C\(.+?\)|\n)/g).filter(Boolean);
    let currentClasses: Set<string> = new Set();
    const elements: JSX.Element[] = [];

    parts.forEach((part, index) => {
        if (part.startsWith('%C(') && part.endsWith(')')) {
            const key = part.substring(3, part.length - 1);
            if (key === 'reset') {
                currentClasses.clear();
            } else if (COLOR_MAP[key]) {
                Object.values(COLOR_MAP).forEach(c => c.split(' ').forEach(cl => currentClasses.delete(cl)));
                COLOR_MAP[key].split(' ').forEach(c => currentClasses.add(c));
            } else if (STYLE_MAP[key]) {
                currentClasses.add(STYLE_MAP[key]);
            }
        } else if (part === '\n') {
            elements.push(<br key={`br-${index}`} />);
        } else {
            elements.push(<span key={index} className={Array.from(currentClasses).join(' ')}>{part}</span>);
        }
    });

    return elements;
};

const TerminalPreview: React.FC<TerminalPreviewProps> = ({ lines }) => {
  return (
    <Card className="p-0 bg-zinc-950 shadow-lg">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <p className="flex-1 text-center text-xs font-medium text-zinc-400">bash</p>
      </div>

      {/* Terminal Body */}
      <pre className="p-4 text-sm font-mono overflow-x-auto bg-zinc-950/50 rounded-b-xl">
        <code>
          {lines.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap break-words leading-relaxed">
              {parseLineToJsx(line)}
            </div>
          ))}
        </code>
      </pre>
    </Card>
  );
};

export default TerminalPreview;
