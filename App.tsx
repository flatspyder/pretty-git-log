import React, { useState, useMemo, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LogDisplay from './components/LogDisplay.js';
import { DEFAULT_FORMAT, SYNTHETIC_LOG_DATA } from './constants.js';
import { formatGitLog } from './services/gitFormatter.js';
import { Chip as ChipType } from './types.js';
import ChipEditor from './components/ChipEditor.js';
import ChipPalette from './components/ChipPalette.js';
import { formatChipsToString, parseStringToChips } from './services/chipFormatter.js';

const App: React.FC = () => {
  const [formatString, setFormatString] = useState<string>(DEFAULT_FORMAT);
  const [activeChips, setActiveChips] = useState<ChipType[]>([]);

  useEffect(() => {
    setActiveChips(parseStringToChips(DEFAULT_FORMAT));
  }, []);

  useEffect(() => {
    setFormatString(formatChipsToString(activeChips));
  }, [activeChips]);

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
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-slate-900 text-slate-300 font-sans p-4 sm:p-8 flex flex-col items-center">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-tight">
            Git Log Pretty Format Simulator
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Visually build your git log format by dragging and dropping chips.
          </p>
        </header>

        <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-400">
                  Format String Builder
              </label>
              <ChipEditor chips={activeChips} setChips={setActiveChips} />

              <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-slate-400">
                      Generated Format String
                  </label>
                  <input
                      type="text"
                      readOnly
                      value={formatString}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 font-mono text-sm"
                  />
              </div>
          </div>

          <div className="md:col-span-1">
            <ChipPalette />
          </div>
        </main>

        <div className="w-full max-w-6xl mt-8">
          <LogDisplay lines={formattedLines} />
        </div>

        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>Built with React, TypeScript, and Tailwind CSS. Drag and drop functionality coming soon!</p>
          <p>&copy; {new Date().getFullYear()} - Visual Git Log Explorer</p>
        </footer>
      </div>
    </DndProvider>
  );
};

export default App;
