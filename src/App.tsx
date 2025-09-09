import React, { useState, useMemo, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast, { Toaster } from 'react-hot-toast';
import CommandBar from './components/CommandBar';
import TerminalPreview from './components/TerminalPreview';
import FormatBuilder from './components/FormatBuilder';
import SelectComponents from './components/SelectComponents';
import Header from './components/Header';
import { SYNTHETIC_LOG_DATA, PRESET_FORMATS } from './constants';
import { formatGitLog } from './services/gitFormatter';
import { chipsToFormatString } from './services/chipFormatter';
import { FormatChip } from './types';
import SectionHeading from './components/SectionHeading';

const App: React.FC = () => {
  const [chips, setChips] = useState<FormatChip[]>(PRESET_FORMATS['medium']);

  const formatString = useMemo(() => chipsToFormatString(chips), [chips]);
  const gitCommand = useMemo(() => `git log --pretty=format:"${formatString}"`, [formatString]);

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
    const newId = `${chip.id}-${Date.now()}`;
    setChips(prev => [...prev, { ...chip, id: newId }]);
  }, []);

  const updateChip = useCallback((index: number, newChip: FormatChip) => {
    setChips(prev => {
      const newChips = [...prev];
      newChips[index] = newChip;
      return newChips;
    });
  }, []);

  const handleReset = () => {
    setChips([]);
    toast('Format reset.');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(gitCommand);
    toast.success('Command copied to clipboard!');
  };

  const handleSelectPreset = (presetChips: FormatChip[]) => {
    const newChips = presetChips.map(chip => ({ ...chip, id: `${chip.id}-${Date.now()}` }));
    setChips(newChips);
    toast.success('Preset loaded!');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '',
          style: {
            margin: '10px',
            background: '#333',
            color: '#fff',
            border: '1px solid #555',
          },
          success: {
            style: {
              background: 'linear-gradient(to right, #4f46e5, #a855f7)',
              color: 'white',
            },
          },
        }}
      />
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-600 dark:text-slate-300">
        <Header onCopy={handleCopy} onReset={handleReset} onSelectPreset={handleSelectPreset} />

        <main className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column: Builder */}
            <div className="lg:col-span-7 space-y-6">
              <SelectComponents onSelect={addChip} />
              <FormatBuilder chips={chips} setChips={setChips} updateChip={updateChip} />
            </div>

            {/* Right Column: Preview */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <SectionHeading className="mb-4">Command</SectionHeading>
                <CommandBar command={gitCommand} />
              </div>
              <div>
                <SectionHeading className="mb-4">Preview</SectionHeading>
                <TerminalPreview lines={formattedLines} />
              </div>
            </div>

          </div>
        </main>
      </div>
    </DndProvider>
  );
};

export default App;
