import { Github } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { Button } from '../ui/Button';

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
          <Button variant="outline" size="sm">Presets</Button>
          <Button variant="outline" size="sm">Reset</Button>
          <Button size="sm">Copy Command</Button>
          <ThemeToggle />
          <Button asChild variant="ghost" size="icon">
            <a
              href="https://github.com/your-repo/git-format"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
