import { Github } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

export function Header() {
  return (
    <header className="w-full container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500">
            Git Format
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            A visual tool to craft the perfect Git log format.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm font-semibold rounded-md border border-slate-200/70 dark:border-white/10 hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
            Presets
          </button>
          <button className="px-3 py-2 text-sm font-semibold rounded-md border border-slate-200/70 dark:border-white/10 hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
            Reset
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-white rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 hover:shadow-md transition-shadow">
            Copy Command
          </button>
          <ThemeToggle />
          <a
            href="https://github.com/your-repo/git-format"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Github className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
