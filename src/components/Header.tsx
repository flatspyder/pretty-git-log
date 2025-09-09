import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Github, Copy, RefreshCw, Book } from 'lucide-react';
import PresetsMenu from './PresetsMenu';
import { FormatChip } from '../types';

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark =
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-indigo-400"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

interface HeaderProps {
    onCopy: () => void;
    onReset: () => void;
    onSelectPreset: (preset: FormatChip[]) => void;
}

const Header: React.FC<HeaderProps> = ({ onCopy, onReset, onSelectPreset }) => {
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const presetsRef = useRef<HTMLDivElement>(null);

  // Close presets menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (presetsRef.current && !presetsRef.current.contains(event.target as Node)) {
        setIsPresetsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="py-4 sm:py-6 border-b border-slate-200 dark:border-zinc-800 sticky top-0 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl z-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Git Pretty Format
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl hidden sm:block">
            Visually craft your{' '}
            <code className="font-mono text-xs bg-slate-100 dark:bg-zinc-800 rounded-sm px-1 py-0.5">
              --pretty=format="..."
            </code>{' '}
            string.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative" ref={presetsRef}>
            <button onClick={() => setIsPresetsOpen(!isPresetsOpen)} className="hidden sm:inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-indigo-400">
              <Book size={16} />
              <span className="hidden lg:inline">Presets</span>
            </button>
            {isPresetsOpen && <PresetsMenu onSelect={onSelectPreset} onClose={() => setIsPresetsOpen(false)} />}
          </div>
          <button onClick={onReset} className="hidden sm:inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-indigo-400">
            <RefreshCw size={16} />
            <span className="hidden lg:inline">Reset</span>
          </button>
          <button onClick={onCopy} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-400">
            <Copy size={16} />
            <span className="hidden md:inline">Copy Command</span>
          </button>
          <div className="h-6 w-px bg-slate-200 dark:bg-zinc-700"></div>
          <a href="https://github.com/michaeltelford/git-pretty-format" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800">
            <Github size={20} />
          </a>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
