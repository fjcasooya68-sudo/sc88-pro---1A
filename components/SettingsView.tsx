
import React from 'react';
import { Settings, Cpu, Volume2, Shield, Info, RefreshCcw, Bell, Eye } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
  onResetData: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdateSettings, onResetData }) => {
  return (
    <div className="flex-1 px-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto pb-20">
      <div className="mb-10">
        <h2 className="text-4xl font-orbitron font-bold text-white mb-2 uppercase tracking-tight">CÀI ĐẶT</h2>
        <p className="text-xs font-bold text-amber-500 tracking-[0.3em] uppercase">Cấu hình hệ thống VIP v8.5.1</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Core AI Settings */}
        <div className="glass rounded-[40px] p-10 border-white/5">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center">
              <Cpu size={24} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-white">Cấu hình AI Neural</h3>
          </div>

          <div className="space-y-10">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-300 uppercase tracking-widest">Độ nhạy phân tích (Sensitivity)</span>
                <span className="font-orbitron font-bold text-amber-500">{settings.aiSensitivity}%</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={settings.aiSensitivity}
                onChange={(e) => onUpdateSettings({ aiSensitivity: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="flex items-center justify-between py-6 border-t border-white/5">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Bell size={20} className="text-gray-400" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-white uppercase">Tự động phân tích</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">AI tự dự báo ngay khi có kết quả mới</p>
                 </div>
              </div>
              <button 
                onClick={() => onUpdateSettings({ autoAnalyze: !settings.autoAnalyze })}
                className={`w-14 h-8 rounded-full transition-all relative ${settings.autoAnalyze ? 'bg-amber-500' : 'bg-zinc-800'}`}
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all ${settings.autoAnalyze ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between py-6 border-t border-white/5">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Eye size={20} className="text-gray-400" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-white uppercase">Chi tiết lập luận</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Hiển thị logic đằng sau mỗi dự đoán</p>
                 </div>
              </div>
              <button 
                onClick={() => onUpdateSettings({ detailedReasoning: !settings.detailedReasoning })}
                className={`w-14 h-8 rounded-full transition-all relative ${settings.detailedReasoning ? 'bg-amber-500' : 'bg-zinc-800'}`}
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all ${settings.detailedReasoning ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* System & Global Settings */}
        <div className="space-y-8">
           <div className="glass rounded-[40px] p-8 border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <Volume2 size={20} className="text-blue-500" />
                <h4 className="text-sm font-black text-white uppercase tracking-widest">Âm thanh & Thông báo</h4>
              </div>
              <div className="flex items-center justify-between">
                 <p className="text-xs font-bold text-gray-400 uppercase">Thông báo giọng nói AI</p>
                 <button 
                  onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                  className={`w-12 h-6 rounded-full transition-all relative ${settings.soundEnabled ? 'bg-blue-600' : 'bg-zinc-800'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${settings.soundEnabled ? 'left-6.5' : 'left-0.5'}`}></div>
                </button>
              </div>
           </div>

           <div className="glass rounded-[40px] p-8 border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <Shield size={20} className="text-emerald-500" />
                <h4 className="text-sm font-black text-white uppercase tracking-widest">Bảo mật & Dữ liệu</h4>
              </div>
              <div className="space-y-4">
                 <button 
                  onClick={onResetData}
                  className="w-full h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center gap-3 text-red-500 font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                 >
                    <RefreshCcw size={18} /> Xóa toàn bộ dữ liệu bàn
                 </button>
                 <p className="text-[10px] text-gray-600 text-center font-bold uppercase tracking-widest">
                   Thao tác này sẽ reset lại chu kỳ cược và lịch sử AI
                 </p>
              </div>
           </div>

           <div className="glass rounded-[40px] p-8 border-white/5 flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                 <Info size={32} className="text-gray-500" />
              </div>
              <div>
                 <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-1">Phiên bản hệ thống</p>
                 <p className="text-white font-orbitron font-bold">SC88-PRO v8.5.12-GOLD</p>
                 <p className="text-[9px] text-gray-600 uppercase font-bold mt-1">Status: All Modules Optimized</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
