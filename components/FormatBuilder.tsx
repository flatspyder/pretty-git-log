import React, { useState, useEffect } from 'react';
import { FormatChip } from '../types';
import { chipsToFormatString } from '../services/chipFormatter';

const ELEMENT_CHIPS: FormatChip[] = [
  { id: 'h', label: '%h', value: '%h', group: 'element' },
  { id: 'H', label: '%H', value: '%H', group: 'element' },
  { id: 's', label: '%s', value: '%s', group: 'element' },
  { id: 'an', label: '%an', value: '%an', group: 'element' },
  { id: 'ar', label: '%ar', value: '%ar', group: 'element' },
  { id: 'd', label: '%d', value: '%d', group: 'element' },
];

const STYLE_CHIPS: FormatChip[] = [
  { id: 'C-yellow', label: '%C(yellow)', value: '%C(yellow)', group: 'style' },
  { id: 'C-green', label: '%C(green)', value: '%C(green)', group: 'style' },
  { id: 'C-reset', label: '%C(reset)', value: '%C(reset)', group: 'style' },
];

interface FormatBuilderProps {
  onChange: (format: string) => void;
}

const FormatBuilder: React.FC<FormatBuilderProps> = ({ onChange }) => {
  const [chips, setChips] = useState<FormatChip[]>([]);

  useEffect(() => {
    onChange(chipsToFormatString(chips));
  }, [chips, onChange]);

  const addChip = (chip: FormatChip) => setChips(prev => [...prev, chip]);
  const removeChip = (index: number) => {
    setChips(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex mb-4">
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 p-2 bg-slate-800 border border-slate-700 rounded">
          {chips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => removeChip(idx)}
              className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-sm"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-48 ml-4">
        <h3 className="text-slate-400 text-xs mb-1">Elements</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {ELEMENT_CHIPS.map(chip => (
            <button
              key={chip.id}
              onClick={() => addChip(chip)}
              className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs"
            >
              {chip.label}
            </button>
          ))}
        </div>
        <h3 className="text-slate-400 text-xs mb-1">Styles</h3>
        <div className="flex flex-wrap gap-2">
          {STYLE_CHIPS.map(chip => (
            <button
              key={chip.id}
              onClick={() => addChip(chip)}
              className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormatBuilder;
