import React, { useState } from 'react';
import { Copy, WrapText } from 'lucide-react';
import Card from './Card';
import clsx from 'clsx';

interface CommandBarProps {
  command: string;
}

const CommandBar: React.FC<CommandBarProps> = ({ command }) => {
  const [wrap, setWrap] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-0">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200/80 dark:border-white/10">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Generated Command
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWrap(!wrap)}
            className={clsx(
              'p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800',
              wrap && 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500'
            )}
            title="Toggle line wrap"
          >
            <WrapText size={16} />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
            title="Copy command"
          >
            <Copy size={16} />
          </button>
        </div>
      </div>
      <div className="p-4 bg-white/50 dark:bg-black/20">
        <pre
          className={clsx(
            'font-mono text-sm text-slate-700 dark:text-slate-300',
            wrap ? 'whitespace-pre-wrap break-all' : 'overflow-x-auto'
          )}
        >
          <code>{command}</code>
        </pre>
      </div>
      {copied && (
         <div className="absolute bottom-4 right-4 text-xs bg-indigo-500 text-white rounded-full px-2 py-0.5">
            Copied!
        </div>
      )}
    </Card>
  );
};

export default CommandBar;
