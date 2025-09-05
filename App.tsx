import React, { useState, useMemo } from 'react';
import LogDisplay from './components/LogDisplay';
import { DEFAULT_FORMAT, SYNTHETIC_LOG_DATA } from './constants';
import { formatGitLog } from './services/gitFormatter';

const App: React.FC = () => {
  const [formatString, setFormatString] = useState<string>(DEFAULT_FORMAT);

  const handleFormatChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormatString(event.target.value);
  };

  const formattedLines = useMemo(() => {
    if (!formatString.trim()) {
      return SYNTHETIC_LOG_DATA.map(commit => commit.hash + ' ' + commit.subject);
    }
    try {
      return formatGitLog(formatString, SYNTHETIC_LOG_DATA);
    } catch (error) {
      console.error("Formatting error:", error);
      return ["Error in format string. Check console for details."];
    }
  }, [formatString]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans p-4 sm:p-8 flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-tight">
          Git Log Pretty Format Simulator
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          Experiment with <code>--pretty=format:&lt;string&gt;</code> placeholders and see the output in real-time.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        <div className="flex flex-col">
          <label htmlFor="format-input" className="mb-2 text-sm font-medium text-slate-400">
            Enter your format string:
          </label>
          <textarea
            id="format-input"
            value={formatString}
            onChange={handleFormatChange}
            className="w-full h-28 p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 font-mono text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200"
            placeholder="e.g., %h - %s"
            spellCheck="false"
          />
        </div>
        
        <LogDisplay lines={formattedLines} />
      </main>
      
      <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>Common placeholders: %h, %H, %s, %an, %ar, %d, %n, %C(yellow), %C(reset)</p>
        <p>&copy; {new Date().getFullYear()} - Built for demonstration.</p>
      </footer>
    </div>
  );
};

export default App;
