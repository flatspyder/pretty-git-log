import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card } from './ui/Card';
import { WrapText } from 'lucide-react';
import { LogPart, LogSizing } from '../types';

interface LogDisplayProps {
  lines: LogPart[][];
  wrapLines: boolean;
}

const NAMED_COLOR_TO_CLASS: { [key: string]: string } = {
  black: 'text-text-muted',
  red: 'text-danger',
  green: 'text-success',
  yellow: 'text-warning',
  blue: 'text-info',
  magenta: 'text-magenta',
  cyan: 'text-accent-start',
  white: 'text-text-primary',
};

function applySizing(text: string, sizing: Partial<LogSizing>): string {
  if (!sizing.width) {
    return text;
  }

  let sizedText = text;

  // Truncation
  if (sizing.truncate === 'right' && sizedText.length > sizing.width) {
    sizedText = sizedText.substring(0, sizing.width);
  }
  // Note: ltrunc and mtrunc are not implemented as they are less common.

  // Padding
  if (sizing.padding === 'left') {
    sizedText = sizedText.padStart(sizing.width);
  } else if (sizing.padding === 'right') {
    sizedText = sizedText.padEnd(sizing.width);
  } else if (sizing.padding === 'both') {
    const padding = Math.max(0, sizing.width - sizedText.length);
    const leftPad = Math.floor(padding / 2);
    const rightPad = padding - leftPad;
    sizedText = ' '.repeat(leftPad) + sizedText + ' '.repeat(rightPad);
  }

  return sizedText;
}

const LogLine: React.FC<{ parts: LogPart[] }> = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => {
        const { style, text } = part;
        const classes = clsx({
          'font-bold': style.bold,
          'opacity-50': style.dim,
          'underline': style.ul,
          'italic': style.italic,
          'line-through': style.strike,
          'animate-pulse': style.blink,
          'bg-light text-surface': style.reverse,
          [NAMED_COLOR_TO_CLASS[style.color!]]: style.color && NAMED_COLOR_TO_CLASS[style.color],
        });

        const inlineStyle: React.CSSProperties = {};
        if (style.color && style.color.startsWith('#')) {
          inlineStyle.color = style.color;
        }

        const displayText = style.sizing ? applySizing(text, style.sizing) : text;

        return (
          <span key={index} className={classes} style={inlineStyle}>
            {displayText}
          </span>
        );
      })}
    </>
  );
};

const LogDisplay: React.FC<LogDisplayProps> = ({ lines, wrapLines }) => {
  const [isWrapped, setWrapLines] = useState(wrapLines);

  return (
    <Card className="p-0 bg-terminal shadow-lg">
      <div className="flex items-center px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-danger/70"></div>
            <div className="w-3 h-3 rounded-full bg-warning/70"></div>
            <div className="w-3 h-3 rounded-full bg-success/70"></div>
        </div>
        <p className="flex-1 text-center text-xs font-medium text-text-secondary">bash</p>
        <button
            onClick={() => setWrapLines(!isWrapped)}
            className={clsx(
              'p-1.5 rounded-md text-text-muted hover:bg-surface-hover',
              isWrapped && 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500'
            )}
            title="Toggle line wrap"
            aria-label="Toggle line wrap"
          >
            <WrapText size={16} />
          </button>
      </div>
    <div className="bg-terminal text-text-primary p-4 font-mono text-sm overflow-auto">
      <pre
        className={clsx({
          'whitespace-pre': !isWrapped,
          'whitespace-pre-wrap break-words': isWrapped,
        })}
      >
        <code>
          {lines.map((line, index) => (
            <div key={index} className="leading-relaxed">
              <LogLine parts={line} />
            </div>
          ))}
        </code>
      </pre>
    </div>
    </Card>
  );
};

export default LogDisplay;
