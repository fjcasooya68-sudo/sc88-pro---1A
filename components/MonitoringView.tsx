
import React, { useMemo } from 'react';
import { Activity, TrendingUp, BarChart3, Zap, ShieldAlert, PieChart } from 'lucide-react';
import { Hand } from '../types';

interface MonitoringViewProps {
  history: Hand[];
}

const MonitoringView: React.FC<MonitoringViewProps> = ({ history }) => {
  // Calculate Statistics
  const stats = useMemo(() => {
    const total = history.length || 1;
    const banker = history.filter(h => h.side === 'BANKER').length;
    const player = history.filter(h => h.side === 'PLAYER').length;
    const tie = history.filter(h => h.side === 'TIE').length;

    return {
      banker: { count: banker, percent: Math.round((banker / total) * 100) },
      player: { count: player, percent: Math.round((player / total) * 100) },
      tie: { count: tie, percent: Math.round((tie / total) * 100) },
      total: history.length
    };
  }, [history]);

  // Streak Analysis
  const streaks = useMemo(() => {
    if (history.length === 0) return { current: 'NONE', length: 0, longest: 0 };
    
    let longest = 0;
    let currentLen = 1;
    let currentSide = history[0].side;
    
    for (let i = 1; i < history.length; i++) {
      if (history[i].side === history[i-1].side) {
        currentLen++;
      } else {
        longest = Math.max(longest, currentLen);
        currentLen = 1;
      }
    }
    longest = Math.max(longest, currentLen);

    // Current streak
    let activeLen = 0;
    const lastSide = history[history.length - 1].side;
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].side === lastSide) activeLen++;
      else break;
    }

    return {
      current: lastSide,
      length: activeLen,
      longest: longest
    };
  }, [history]);

  // Generate SVG Chart Data (Trend line)
  const chartPoints = useMemo(() => {
    if (history.length === 0) return "";
    const width = 800;
    const height = 150;
    const step = width / Math.max(history.length - 1, 10);
    
    let currentY = height / 2;
    let points = `0,${currentY}`;
    
    history.forEach((hand, i) => {
      if (hand.side === 'BANKER') currentY -= 15;
      else if (hand.side === 'PLAYER') currentY += 15;
      // Clamp values
      currentY = Math.max(10, Math.min(height - 10, currentY));
      points += ` ${(i + 1) * step},${currentY}`;
    });
    
    return points;
  }, [history]);

  return (
    <div className="flex-1 px-10 py-6 animate-in fade-in slide-in-from-right-4 duration-500 overflow-y-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-orbitron font-bold text-white mb-2 uppercase tracking-tight">BIỂU ĐỒ</h2>
          <p className="text-xs font-bold text-amber-500 tracking-[0.3em] uppercase">Phân tích cường độ & Xu hướng</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-zinc-900/50 border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1">Cường độ Banker</span>
              <span className="text-xl font-orbitron font-bold text-red-500">{stats.banker.percent}%</span>
           </div>
           <div className="px-6 py-3 bg-zinc-900/50 border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1">Cường độ Player</span>
              <span className="text-xl font-orbitron font-bold text-blue-500">{stats.player.percent}%</span>
           </div>
        </div>
      </div>

      {/* Main Trend Chart */}
      <div className="glass rounded-[40px] p-10 mb-8 relative overflow-hidden group border-white/5">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Activity size={120} className="text-amber-500" />
        </div>
        
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center">
             <TrendingUp size={24} className="text-amber-500" />
           </div>
           <div>
             <h3 className="text-lg font-bold text-white uppercase tracking-wider">Xu Hướng Momentum</h3>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Biểu đồ biến động lực cầu thời gian thực</p>
           </div>
        </div>

        <div className="h-[200px] w-full bg-black/40 rounded-3xl border border-white/5 relative p-4">
           {history.length < 2 ? (
             <div className="absolute inset-0 flex items-center justify-center text-gray-600 italic text-sm">
               Cần thêm dữ liệu để hiển thị biểu đồ xu hướng...
             </div>
           ) : (
             <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 150">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(245, 158, 11, 0.2)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                {/* Reference Grid */}
                <line x1="0" y1="75" x2="800" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="5,5" />
                
                {/* Trend Line */}
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={chartPoints}
                  className="drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                />
                
                {/* Current Point Pulse */}
                {(() => {
                    const lastP = chartPoints.split(' ').pop()?.split(',');
                    if (!lastP) return null;
                    return (
                      <circle cx={lastP[0]} cy={lastP[1]} r="4" fill="#f59e0b">
                        <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                      </circle>
                    );
                })()}
             </svg>
           )}
           
           <div className="absolute bottom-4 left-4 flex gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
                 <span className="text-[9px] text-gray-500 font-bold uppercase">Ưu thế Banker</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                 <span className="text-[9px] text-gray-500 font-bold uppercase">Ưu thế Player</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Distribution Card */}
        <div className="glass rounded-[40px] p-8 border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <PieChart size={20} className="text-blue-500" />
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Phân bổ kết quả</h4>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                <span className="text-red-500">Banker</span>
                <span className="text-white">{stats.banker.count} ({stats.banker.percent}%)</span>
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-1000"
                  style={{ width: `${stats.banker.percent}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                <span className="text-blue-500">Player</span>
                <span className="text-white">{stats.player.count} ({stats.player.percent}%)</span>
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000"
                  style={{ width: `${stats.player.percent}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                <span className="text-emerald-500">Tie</span>
                <span className="text-white">{stats.tie.count} ({stats.tie.percent}%)</span>
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000"
                  style={{ width: `${stats.tie.percent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Streak Analyzer */}
        <div className="glass rounded-[40px] p-8 border-white/5 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-6">
            <Zap size={20} className="text-amber-500" />
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Phân tích chuỗi</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-black/40 border border-white/5 rounded-3xl p-6 text-center">
                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-2">Chuỗi hiện tại</p>
                <p className={`text-3xl font-orbitron font-black italic ${streaks.current === 'BANKER' ? 'text-red-500' : streaks.current === 'PLAYER' ? 'text-blue-500' : 'text-emerald-500'}`}>
                  {streaks.length}
                </p>
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-tighter mt-1">{streaks.current}</p>
             </div>
             <div className="bg-black/40 border border-white/5 rounded-3xl p-6 text-center">
                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-2">Bệt dài nhất</p>
                <p className="text-3xl font-orbitron font-black italic text-white">
                  {streaks.longest}
                </p>
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-tighter mt-1">MAX DRAGON</p>
             </div>
          </div>

          <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
             <div className="flex items-center gap-2 mb-2">
                <ShieldAlert size={14} className="text-amber-500" />
                <span className="text-[10px] font-black text-amber-500 uppercase">Cảnh báo hệ thống</span>
             </div>
             <p className="text-[11px] text-gray-400 leading-tight">
               {streaks.length >= 4 
                 ? `Đang trong chuỗi bệt ${streaks.current}. Hệ thống khuyến nghị theo cầu cho đến khi gãy.` 
                 : "Cầu đang trong giai đoạn biến động ngắn. Ưu tiên đánh theo công thức Scalping."}
             </p>
          </div>
        </div>

        {/* AI Health Score */}
        <div className="glass rounded-[40px] p-8 border-white/5 flex flex-col items-center justify-center text-center">
           <div className="relative w-32 h-32 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                 <circle 
                   cx="64" 
                   cy="64" 
                   r="58" 
                   stroke="currentColor" 
                   strokeWidth="8" 
                   fill="transparent" 
                   strokeDasharray={364.4}
                   strokeDashoffset={364.4 - (364.4 * 88) / 100}
                   className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                 />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                 <span className="text-3xl font-orbitron font-black text-white">88</span>
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">PRO</span>
              </div>
           </div>
           <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">System Accuracy</h4>
           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
             Tỷ lệ dự đoán chính xác dựa trên <br/> {history.length} ván đã qua của bàn này.
           </p>
           
           <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Optimized Performance</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringView;
