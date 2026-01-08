
import React from 'react';
import { Hand } from '../types';

interface InputControlsProps {
  onAddHand: (side: 'BANKER' | 'PLAYER' | 'TIE') => void;
}

const InputControls: React.FC<InputControlsProps> = ({ onAddHand }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <button
        onClick={() => onAddHand('PLAYER')}
        className="group relative h-24 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 btn-glow-b"
      >
        <div className="absolute inset-0 bg-blue-600 transition-colors group-hover:bg-blue-500"></div>
        <div className="relative flex flex-col items-center justify-center">
          <span className="text-2xl font-orbitron font-black italic text-white leading-none">PLAYER</span>
          <span className="text-[10px] font-bold text-blue-100/70 tracking-widest mt-1">NHÀ CON</span>
        </div>
      </button>

      <button
        onClick={() => onAddHand('BANKER')}
        className="group relative h-24 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 btn-glow-r"
      >
        <div className="absolute inset-0 bg-red-600 transition-colors group-hover:bg-red-500"></div>
        <div className="relative flex flex-col items-center justify-center">
          <span className="text-2xl font-orbitron font-black italic text-white leading-none">BANKER</span>
          <span className="text-[10px] font-bold text-red-100/70 tracking-widest mt-1">NHÀ CÁI</span>
        </div>
      </button>

      <button
        onClick={() => onAddHand('TIE')}
        className="group relative h-24 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 btn-glow-g"
      >
        <div className="absolute inset-0 bg-emerald-600 transition-colors group-hover:bg-emerald-500"></div>
        <div className="relative flex flex-col items-center justify-center">
          <span className="text-2xl font-orbitron font-black italic text-white leading-none">TIE</span>
          <span className="text-[10px] font-bold text-emerald-100/70 tracking-widest mt-1">HÒA</span>
        </div>
      </button>
    </div>
  );
};

export default InputControls;
