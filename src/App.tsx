import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast, { Toaster } from 'react-hot-toast';
import SelectComponents from './components/SelectComponents';
import Header from './components/Header';
import { FormatChip } from './types';

const App: React.FC = () => {
  // Dummy functions for props
  const handleCopy = () => {};
  const handleReset = () => {};
  const handleSelectPreset = () => {};
  const addChip = useCallback((chip: FormatChip) => {
    console.log('Selected chip:', chip);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-600 dark:text-slate-300">
        <Header onCopy={handleCopy} onReset={handleReset} onSelectPreset={handleSelectPreset} />

        <main className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            <SelectComponents onSelect={addChip} />
        </main>
      </div>
    </DndProvider>
  );
};

export default App;
