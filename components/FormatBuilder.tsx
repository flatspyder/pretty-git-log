import React, { useCallback, useState } from 'react';
import { FormatChip } from '../types';
import DraggableChip from './DraggableChip';
import { PRESET_FORMATS, ELEMENT_CHIP_GROUPS, STYLE_CHIPS } from '../constants';

interface FormatBuilderProps {
  chips: FormatChip[];
  setChips: React.Dispatch<React.SetStateAction<FormatChip[]>>;
  updateChip: (index: number, newChip: FormatChip) => void;
}

const FormatBuilder: React.FC<FormatBuilderProps> = ({ chips, setChips, updateChip }) => {
  const [editingChipIndex, setEditingChipIndex] = useState<number | null>(null);

  const removeChip = (index: number) => {
    setChips(prev => prev.filter((_, i) => i !== index));
  };

  const moveChip = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragChip = chips[dragIndex];
      setChips(prevChips => {
        const newChips = [...prevChips];
        newChips.splice(dragIndex, 1);
        newChips.splice(hoverIndex, 0, dragChip);
        return newChips;
      });
    },
    [chips, setChips]
  );

  const applyPreset = (formatName: string) => {
    setChips(PRESET_FORMATS[formatName]);
  };

  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-cyan-400">2. Build Your Format</h2>
        <div className="text-sm">
          <span className="text-slate-400 mr-2">Examples:</span>
          <button onClick={() => applyPreset('oneline')} className="text-cyan-400 hover:underline mr-2">oneline</button>
          <button onClick={() => applyPreset('short')} className="text-cyan-400 hover:underline mr-2">short</button>
          <button onClick={() => applyPreset('medium')} className="text-cyan-400 hover:underline">medium</button>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 p-2 bg-slate-800 border border-slate-700 rounded min-h-[42px]">
          {chips.map((chip, idx) => (
            <DraggableChip
              key={chip.id + idx}
              index={idx}
              chip={chip}
              moveChip={moveChip}
              removeChip={removeChip}
              updateChip={updateChip}
              isEditing={editingChipIndex === idx}
              setEditing={setEditingChipIndex}
              chipGroups={[...ELEMENT_CHIP_GROUPS, STYLE_CHIPS]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormatBuilder;
