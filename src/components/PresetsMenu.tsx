import React from 'react';
import { motion } from 'framer-motion';

interface PresetsMenuProps {
  onSelect: (preset: String) => void;
  onClose: () => void;
}

const presetOptions = [
  { key: 'oneline', name: 'One Line', description: 'Commit hash and subject.' },
  { key: 'short', name: 'Short', description: 'Hash, subject, and author name.' },
  { key: 'medium', name: 'Medium', description: 'Detailed info with relative date.' }
];

const PresetsMenu: React.FC<PresetsMenuProps> = ({ onSelect, onClose }) => {
  const handleSelect = (key: string) => {
    onSelect(key);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full right-0 mt-2 w-64 origin-top-right rounded-xl bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30 border border-slate-200/80 dark:border-white/10"
    >
      <div className="p-2">
        {presetOptions.map((preset) => (
          <button
            key={preset.key}
            onClick={() => handleSelect(preset.key)}
            className="w-full text-left rounded-md p-2 hover:bg-slate-100 dark:hover:bg-zinc-700/50"
          >
            <p className="font-medium text-sm text-slate-800 dark:text-slate-100">{preset.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{preset.description}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default PresetsMenu;