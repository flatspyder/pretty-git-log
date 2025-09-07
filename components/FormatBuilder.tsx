import React, { useState, useEffect } from 'react';
import { FormatChip } from '../types';
import { chipsToFormatString } from '../services/chipFormatter';

interface ChipCategory {
  title: string;
  options: FormatChip[];
}

const ELEMENT_CATEGORIES: ChipCategory[] = [
  {
    title: 'Hash',
    options: [
      { id: 'H', label: 'Commit hash: full', value: '%H' },
      { id: 'h', label: 'Commit hash: short', value: '%h' },
      { id: 'T', label: 'Tree hash: full', value: '%T' },
      { id: 't', label: 'Tree hash: short', value: '%t' },
      { id: 'P', label: 'Parent hashes: full', value: '%P' },
      { id: 'p', label: 'Parent hashes: short', value: '%p' },
    ],
  },
  {
    title: 'Author',
    options: [
      { id: 'an', label: 'Author name', value: '%an' },
      { id: 'ae', label: 'Author email', value: '%ae' },
      { id: 'al', label: 'Author local-part', value: '%al' },
      { id: 'ad', label: 'Author date', value: '%ad' },
      { id: 'ai', label: 'Author date ISO-like', value: '%ai' },
      { id: 'aI', label: 'Author date strict ISO', value: '%aI' },
      { id: 'ah', label: 'Author date human', value: '%ah' },
      { id: 'as', label: 'Author date short', value: '%as' },
      { id: 'at', label: 'Author date UNIX', value: '%at' },
      { id: 'ar', label: 'Author date relative', value: '%ar' },
    ],
  },
  {
    title: 'Committer',
    options: [
      { id: 'cn', label: 'Committer name', value: '%cn' },
      { id: 'ce', label: 'Committer email', value: '%ce' },
      { id: 'cl', label: 'Committer local-part', value: '%cl' },
      { id: 'cd', label: 'Committer date', value: '%cd' },
      { id: 'ci', label: 'Committer date ISO-like', value: '%ci' },
      { id: 'cI', label: 'Committer date strict ISO', value: '%cI' },
      { id: 'ch', label: 'Committer date human', value: '%ch' },
      { id: 'cs', label: 'Committer date short', value: '%cs' },
      { id: 'ct', label: 'Committer date UNIX', value: '%ct' },
      { id: 'cr', label: 'Committer date relative', value: '%cr' },
    ],
  },
  {
    title: 'Subject & Body',
    options: [
      { id: 's', label: 'Subject', value: '%s' },
      { id: 'f', label: 'Subject sanitized', value: '%f' },
      { id: 'b', label: 'Body', value: '%b' },
      { id: 'B', label: 'Subject and body', value: '%B' },
    ],
  },
  {
    title: 'Refs',
    options: [
      { id: 'd', label: 'Decorations', value: '%d' },
      { id: 'D', label: 'Decorations (plain)', value: '%D' },
    ],
  },
  {
    title: 'Misc',
    options: [
      { id: 'e', label: 'Encoding', value: '%e' },
      { id: 'n', label: 'Newline', value: '%n' },
    ],
  },
];

const STYLE_CATEGORIES: ChipCategory[] = [
  {
    title: 'Style',
    options: [
      { id: 'C-normal', label: 'Normal', value: '%C(normal)', className: 'bg-slate-700 text-slate-200' },
      { id: 'C-black', label: 'Black', value: '%C(black)', className: 'bg-black text-white' },
      { id: 'C-red', label: 'Red', value: '%C(red)', className: 'bg-red-500 text-white' },
      { id: 'C-green', label: 'Green', value: '%C(green)', className: 'bg-green-500 text-white' },
      { id: 'C-yellow', label: 'Yellow', value: '%C(yellow)', className: 'bg-yellow-400 text-black' },
      { id: 'C-blue', label: 'Blue', value: '%C(blue)', className: 'bg-blue-500 text-white' },
      { id: 'C-magenta', label: 'Magenta', value: '%C(magenta)', className: 'bg-fuchsia-500 text-white' },
      { id: 'C-cyan', label: 'Cyan', value: '%C(cyan)', className: 'bg-cyan-400 text-black' },
      { id: 'C-white', label: 'White', value: '%C(white)', className: 'bg-white text-black' },
      { id: 'C-default', label: 'Default', value: '%C(default)', className: 'bg-slate-700 text-slate-200' },
      { id: 'C-reset', label: 'Reset', value: '%C(reset)', className: 'bg-slate-700 text-slate-200' },
    ],
  },
];

interface SelectedChip {
  selected: FormatChip;
  options: FormatChip[];
  displayLabel: string;
  hasSelected: boolean;
}

interface FormatBuilderProps {
  onChange: (format: string) => void;
}

const FormatBuilder: React.FC<FormatBuilderProps> = ({ onChange }) => {
  const [chips, setChips] = useState<SelectedChip[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const selected = chips.filter(c => c.hasSelected).map(c => c.selected);
    onChange(chipsToFormatString(selected));
  }, [chips, onChange]);

  const addChip = (category: ChipCategory) => {
    const defaultOption = category.options[0];
    setChips(prev => [
      ...prev,
      {
        selected: defaultOption,
        options: category.options,
        displayLabel: category.title,
        hasSelected: false,
      },
    ]);
  };

  const removeChip = (index: number) => {
    setChips(prev => prev.filter((_, i) => i !== index));
    setOpenIndex(null);
  };

  const selectOption = (index: number, option: FormatChip) => {
    setChips(prev =>
      prev.map((chip, i) =>
        i === index
          ? { ...chip, selected: option, displayLabel: option.label, hasSelected: true }
          : chip
      )
    );
    setOpenIndex(null);
  };

  const renderChip = (chip: SelectedChip, idx: number) => {
    const baseClass = chip.hasSelected && chip.selected.className
      ? chip.selected.className
      : 'bg-slate-700 text-slate-200';
    return (
      <div key={idx} className="relative inline-flex rounded overflow-hidden text-sm">
        <button
          onClick={() => removeChip(idx)}
          className={`${baseClass} px-2 py-1`}
        >
          {chip.displayLabel}
        </button>
        <button
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          className={`${baseClass} border-l border-slate-600 px-1`}
        >
          ▾
        </button>
        {openIndex === idx && (
          <div className="absolute right-0 mt-1 bg-slate-800 border border-slate-700 rounded z-10">
            {chip.options.map(option => (
              <button
                key={option.id}
                onClick={() => selectOption(idx, option)}
                className="block w-full text-left px-2 py-1 text-xs hover:bg-slate-700"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCategoryButtons = (categories: ChipCategory[]) => (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map(cat => (
        <button
          key={cat.title}
          onClick={() => addChip(cat)}
          className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs"
        >
          {cat.title}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex mb-4">
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 p-2 bg-slate-800 border border-slate-700 rounded">
          {chips.map(renderChip)}
        </div>
      </div>
      <div className="w-64 ml-4 overflow-y-auto max-h-96">
        <h3 className="text-slate-400 text-xs mb-1">Elements</h3>
        {renderCategoryButtons(ELEMENT_CATEGORIES)}
        <h3 className="text-slate-400 text-xs mb-1">Styles</h3>
        {renderCategoryButtons(STYLE_CATEGORIES)}
      </div>
    </div>
  );
};

export default FormatBuilder;

