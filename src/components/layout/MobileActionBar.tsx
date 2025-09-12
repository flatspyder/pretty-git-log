import { Book, Copy } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { PRESET_FORMATS } from '../../constants';

interface MobileActionBarProps {
  onCopy: () => void;
  applyPreset: (name: string) => void;
}

export function MobileActionBar({ onCopy, applyPreset }: MobileActionBarProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-lg border-t border-border p-2 flex justify-center items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-indigo-400">
            <Book size={16} />
            <span className="inline">Presets</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top">
          {Object.keys(PRESET_FORMATS).map((presetName) => (
            <DropdownMenuItem key={presetName} onClick={() => applyPreset(presetName)}>
              {presetName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <button onClick={onCopy} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-400">
        <Copy size={16} />
        <span className="inline">Copy Command</span>
      </button>
    </div>
  );
}
