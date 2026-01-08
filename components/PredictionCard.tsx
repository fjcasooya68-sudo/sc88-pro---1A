
import React from 'react';
import { ShieldCheck, Wallet, Timer, Settings, TrendingUp, TrendingDown, CircleDollarSign } from 'lucide-react';
import { PredictionResult } from '../types';

interface PredictionCardProps {
  prediction: PredictionResult | null;
  isAnalyzing: boolean;
  timeLeft: number;
  isSetupMode: boolean;
  totalProfit: number; // Prop mới
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, isAnalyzing, timeLeft, isSetupMode, totalProfit }) => {
  const getSideColor = (side: string) => {
    if (side === 'BANKER') return 'text-red-500';
    if (side === 'PLAYER') return 'text-blue-500';
    if (side === 'TIE') return 'text-emerald-500';
    return 'text-gray-400';
  };

  const confidenceValue = prediction?.confidence || 0;
  const displayConfidence = Math.round(confidenceValue);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Prediction, Unit & Profit */}
      <div className={`col-span-1 md:col-span-2 glass rounded-3xl p-8 flex items-center justify-between transition-all duration-500 ${isSetupMode ? 'border-amber-500/20 bg-amber-500/5 shadow-[0_0_30px_rgba(245,158,11,0.05)]' : 'border-white/5'}`}>
        <div className="flex flex-col gap-4 flex-1">
          {/* AI Prediction */}
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${isSetupMode ? 'bg-amber-500/20 border-amber-500/30' : 'bg-amber-500/10 border-amber-500/20'}`}>
              {isSetupMode ? <Settings className="text-amber-500 animate-spin-slow" size={24} /> : <ShieldCheck className="text-amber-500" size={24} />}
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">DỰ ĐOÁN AI</p>
              <h2 className={`text-4xl font-orbitron font-black italic tracking-tighter transition-all duration-500 ${isAnalyzing ? 'animate-pulse opacity-50' : getSideColor(prediction?.side || (isSetupMode ? 'READY' : 'WAIT'))}`}>
                {isAnalyzing ? '...' : (isSetupMode ? 'READY' : (prediction?.side || '---'))}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-10">
            {/* Unit Info */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Wallet className="text-amber-500" size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">ĐƠN VỊ CƯỢC</p>
                <h3 className="text-2xl font-orbitron font-black text-white italic tracking-tighter">
                  {isSetupMode ? '--' : (prediction?.unit || 1)} <span className="text-amber-500 text-sm">%</span>
                </h3>
              </div>
            </div>

            {/* Profit Section - NEW FEATURE */}
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${totalProfit >= 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <CircleDollarSign className={totalProfit >= 0 ? 'text-emerald-500' : 'text-red-500'} size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">LÃI / LỖ PHIÊN</p>
                <div className="flex items-center gap-2">
                  <h3 className={`text-2xl font-orbitron font-black italic tracking-tighter ${totalProfit >= 0 ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'text-red-500'}`}>
                    {totalProfit > 0 ? `+${totalProfit}` : totalProfit}
                    <span className="text-sm ml-1">%</span>
                  </h3>
                  {totalProfit !== 0 && (
                    totalProfit > 0 ? <TrendingUp size={14} className="text-emerald-400" /> : <TrendingDown size={14} className="text-red-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Win Rate Circle */}
        <div className="flex flex-col items-center justify-center text-center ml-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/5"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={351.8}
                  strokeDashoffset={351.8 - (351.8 * (isSetupMode ? 0 : displayConfidence)) / 100}
                  strokeLinecap="round"
                  className="text-amber-500 transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-3xl font-orbitron font-black text-white">{isSetupMode ? '0' : displayConfidence}<span className="text-sm text-amber-500">%</span></span>
             </div>
             <div className="absolute -top-1 -right-1 bg-zinc-900 border border-white/10 rounded-full p-1 shadow-lg">
                <ShieldCheck size={14} className="text-amber-500" />
             </div>
          </div>
          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.2em] mt-2">TỶ LỆ THẮNG AI</p>
        </div>
      </div>

      {/* Timer Card */}
      <div className={`glass rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-500 ${isSetupMode ? 'opacity-50 grayscale select-none' : ''}`}>
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
           <Timer size={80} className="text-amber-500" />
        </div>
        
        <div className="relative">
          <div className="w-20 h-20 border-4 border-amber-500/20 rounded-full flex items-center justify-center mb-4">
            {!isSetupMode && <div className="w-16 h-16 border-t-4 border-amber-500 rounded-full animate-spin"></div>}
            <span className="absolute text-3xl font-orbitron font-bold text-white">{isSetupMode ? '--' : timeLeft}</span>
          </div>
        </div>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest text-center">GIÂY TIẾP THEO</p>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PredictionCard;
