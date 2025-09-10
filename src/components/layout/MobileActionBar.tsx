import React from 'react';
import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { PRESET_FORMATS } from '../../constants';

interface MobileActionBarProps {
  onCopy: () => void;
  applyPreset: (name: string) => void;
}

export function MobileActionBar({ onCopy, applyPreset }: MobileActionBarProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-zinc-800 p-2 flex justify-center items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">Presets</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top">
          <DropdownMenuLabel>Select a Preset</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.keys(PRESET_FORMATS).map((presetName) => (
            <DropdownMenuItem key={presetName} onClick={() => applyPreset(presetName)}>
              {presetName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button size="sm" onClick={onCopy}>Copy Command</Button>
    </div>
  );
}
