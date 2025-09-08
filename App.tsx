import React, { useState, useMemo, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LogDisplay from './components/LogDisplay';
import FormatBuilder from './components/FormatBuilder';
import SelectComponents from './components/SelectComponents';
import { SYNTHETIC_LOG_DATA } from './constants';
import { formatGitLog } from './services/gitFormatter';
import { chipsToFormatString } from './services/chipFormatter';
import { FormatChip } from './types';

const App: React.FC = () => {
  const [chips, setChips] = useState<FormatChip[]>([]);

  const formatString = useMemo(() => chipsToFormatString(chips), [chips]);

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

  const addChip = useCallback((chip: FormatChip) => {
    setChips(prev => [...prev, chip]);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
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
          <SelectComponents onSelect={addChip} />
          <FormatBuilder chips={chips} setChips={setChips} />
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">3. Formatted String</h2>
            <div className="flex flex-col relative">
              <textarea
                id="format-output"
                value={formatString}
                readOnly
                className="w-full h-28 p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 font-mono text-sm pr-24"
                spellCheck="false"
              />
              <button
                onClick={() => navigator.clipboard.writeText(formatString)}
                className="absolute top-2 right-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="w-full max-w-4xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">4. Example Output</h2>
            <LogDisplay lines={formattedLines} />
          </div>
        </main>

        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>Common placeholders: %h, %H, %s, %an, %ar, %d, %n, %C(yellow), %C(reset)</p>
          <p>&copy; {new Date().getFullYear()} - Built for demonstration.</p>
        </footer>
      </div>
    </DndProvider>
  );
};

export default App;
