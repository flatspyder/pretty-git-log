import React, { useState, useMemo, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TextareaAutosize from 'react-textarea-autosize';
import LogDisplay from './components/LogDisplay';
import FormatBuilder from './components/FormatBuilder';
import SelectComponents from './components/SelectComponents';
import { PRESET_FORMATS, SYNTHETIC_LOG_DATA } from './constants';
import { formatGitLog } from './services/gitFormatter';
import { chipsToFormatString } from './services/chipFormatter';
import { ChipDefinition, FormatChip } from './types';
import { nanoid } from 'nanoid';
import { Header } from './components/layout/Header';
import { MobileActionBar } from './components/layout/MobileActionBar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/Card';
import { Button } from './components/ui/Button';
import { motion } from 'framer-motion';
import { Switch } from './components/ui/Switch';
import { Label } from './components/ui/Label';
import toast, { Toaster } from 'react-hot-toast';
import SectionHeading from './components/SectionHeading';
import clsx from 'clsx';
import { Copy, WrapText } from 'lucide-react';


const App: React.FC = () => {
  const [chips, setChips] = useState<FormatChip[]>([]);
  const [wrapLines, setWrapLines] = useState(false);
  const [wrap, setWrap] = useState(false);

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

  const addChip = useCallback((chip: ChipDefinition) => {
    setChips(prev => [...prev, { ...chip, instanceId: nanoid() }]);
  }, []);

  const updateChip = useCallback((index: number, newChip: FormatChip) => {
    setChips(prev => {
      const newChips = [...prev];
      newChips[index] = newChip;
      return newChips;
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatString);
    toast.success('Copied to clipboard!');
  };

  const applyPreset = (formatName: string) => {
    const presetChips = PRESET_FORMATS[formatName].map(chip => ({
      ...chip,
      instanceId: nanoid(),
    }));
    setChips(presetChips);
    toast.success(`Preset "${formatName}" loaded!`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        <Toaster position="bottom-right" />
        <Header onCopy={handleCopy} applyPreset={applyPreset} />
        <main className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex-grow pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* --- Builder Column --- */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <SectionHeading className="mb-4">Tokens Palette</SectionHeading>
                <Card className="p-4 sm:p-6">
                  <SelectComponents onSelect={addChip} />
                </Card>
              </div>
              
              <FormatBuilder chips={chips} setChips={setChips} updateChip={updateChip} />
            </div>

            {/* --- Preview Column --- */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <SectionHeading className="mb-4">Command</SectionHeading>
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
                      <code>{formatString}</code>
                    </pre>
                  </div>
                </Card>
              </div>
              <div>
                <SectionHeading className="mb-4">Preview</SectionHeading>
                <LogDisplay lines={formattedLines} wrapLines={wrapLines} />
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center text-slate-500 dark:text-slate-400 text-sm py-4">
          <p>Common placeholders: %h, %H, %s, %an, %ar, %d, %n, %C(yellow), %C(reset)</p>
          <p>&copy; {new Date().getFullYear()} - Built for demonstration.</p>
        </footer>
        <MobileActionBar onCopy={handleCopy} applyPreset={applyPreset} />
      </div>
    </DndProvider>
  );
};

export default App;
