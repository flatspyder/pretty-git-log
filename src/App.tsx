import React, { useState, useMemo, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TextareaAutosize from 'react-textarea-autosize';
import LogDisplay from './components/LogDisplay';
import FormatBuilder from './components/FormatBuilder';
import SelectComponents from './components/SelectComponents';
import { SYNTHETIC_LOG_DATA } from './constants';
import { formatGitLog } from './services/gitFormatter';
import { chipsToFormatString } from './services/chipFormatter';
import { FormatChip } from './types';
import { Header } from './components/layout/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/Card';
import { Button } from './components/ui/Button';


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

  const updateChip = useCallback((index: number, newChip: FormatChip) => {
    setChips(prev => {
      const newChips = [...prev];
      newChips[index] = newChip;
      return newChips;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* --- Builder Column --- */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Tokens Palette</CardTitle>
                  <CardDescription>
                    Click or drag tokens to the dropzone to build your format.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SelectComponents onSelect={addChip} />
                </CardContent>
              </Card>
              <FormatBuilder chips={chips} setChips={setChips} updateChip={updateChip} />
            </div>

            {/* --- Preview Column --- */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Command String</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col relative">
                    <TextareaAutosize
                      id="format-output"
                      value={formatString}
                      readOnly
                      className="w-full p-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-black dark:text-white font-mono text-sm pr-24"
                      spellCheck="false"
                      minRows={1}
                    />
                    <Button
                      onClick={() => navigator.clipboard.writeText(formatString)}
                      variant="default"
                      size="sm"
                      className="absolute top-2 right-2"
                    >
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <LogDisplay lines={formattedLines} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <footer className="text-center text-slate-500 dark:text-slate-400 text-sm py-4">
          <p>Common placeholders: %h, %H, %s, %an, %ar, %d, %n, %C(yellow), %C(reset)</p>
          <p>&copy; {new Date().getFullYear()} - Built for demonstration.</p>
        </footer>
      </div>
    </DndProvider>
  );
};

export default App;
