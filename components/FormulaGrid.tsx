
import React, { useState } from 'react';
import { 
  TrendingUp, 
  GitBranch, 
  ListTree, 
  RotateCcw, 
  Plus, 
  X, 
  CheckCircle2, 
  Info, 
  Shuffle, 
  Activity, 
  Repeat, 
  BarChart3,
  BrainCircuit,
  Zap,
  Layers,
  Sparkles,
  Sword,
  Waves
} from 'lucide-react';
import { Formula } from '../types';

export const formulas: Formula[] = [
  {
    id: 'formula_pingpong_dragon',
    title: 'Công thức 1-1 & Bệt',
    tag: 'DYNAMIC PATTERN',
    iconName: 'Waves',
    description: 'Bám nhịp 1-1 linh hoạt. Tự động chuyển sang bắt bệt ngay khi cầu lên 2.',
    instructions: 'Logic: Nếu cầu đang đi 1-1 (ví dụ P-B-P), ván tiếp theo đánh ngược lại ván trước để duy trì nhịp nhảy. Nếu cầu xuất hiện 2 ván trùng (ví dụ B-B), lập tức đánh theo bệt (đánh Banker) cho đến khi gãy. Khi gãy bệt, quay lại bắt nhịp 1-1.',
    complexity: 'Trung Bình',
    complexityColor: 'text-amber-500',
    winRate: '91%',
    logicDescription: 'Pattern: 1-1 Alternating / 2+ Dragon | Staking: 1-3-7-15-31-63'
  },
  {
    id: 'formula_123',
    title: 'Công thức 123 (Neural VIP)',
    tag: 'ADVANCED PATTERN',
    iconName: 'BrainCircuit',
    description: 'Chiến thuật nhịp điệu 1-2-3 kết hợp quản lý vốn cấp tiến x2+1.',
    instructions: 'Logic: Đánh theo chu kỳ 1 Con - 2 Cái - 3 Con (hoặc ngược lại). Quản lý vốn: Thắng cược 1% đều tay. Nếu thua, gấp thếp dãy: 1-3-7-15-31-63. Thắng reset về 1%.',
    complexity: 'Trung Bình',
    complexityColor: 'text-amber-500',
    winRate: '94%',
    logicDescription: 'Pattern: 1-2-3 Logic | Staking: 1-3-7-15-31-63'
  },
  {
    id: 'formula_31_bet',
    title: 'Công thức 3-1 & Bệt',
    tag: 'SCALPING PRO',
    iconName: 'Sword',
    description: 'Ưu tiên bắt 1-1. Chỉ bẻ khi cầu lên 3 và bắt bệt dọc từ tay thứ 4.',
    instructions: 'Logic: Nếu cầu về 1 ván (ví dụ P sau B) -> Bắt 1-1 (đánh ngược). Không chủ động bắt lên 2 hay 3. Nếu cầu tự lên 3 -> Bắt gãy 3-1 (đánh ngược). Nếu lên 4 -> Đu bệt (đánh cùng). Quản lý vốn: Thắng 1%, thua gấp dãy: 1-3-7-15-31-63.',
    complexity: 'Trung Bình',
    complexityColor: 'text-amber-500',
    winRate: '92%',
    logicDescription: 'Pattern: 1-1 Focus / 4+ Dragon | Staking: 1-3-7-15-31-63'
  },
  {
    id: 'martingale',
    title: 'Martingale Pro',
    tag: 'PROGRESSIVE',
    iconName: 'TrendingUp',
    description: 'Gấp đôi mức cược sau mỗi ván thua. Phù hợp cho người chơi có vốn đối ứng lớn.',
    instructions: 'Mức cược: 1-2-4-8-16-32... Thắng quay về 1. Giúp thu hồi toàn bộ vốn thua chỉ bằng 1 ván thắng duy nhất.',
    complexity: 'Thấp',
    complexityColor: 'text-emerald-500',
    winRate: '85%',
    logicDescription: 'Logic: Bet = Initial * 2^Losses'
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci Sequence',
    tag: 'SEQUENCE',
    iconName: 'GitBranch',
    description: 'Cược theo dãy số tự nhiên 1, 1, 2, 3, 5... Giảm áp lực tâm lý hơn Martingale.',
    instructions: 'Dãy số: 1, 1, 2, 3, 5, 8, 13, 21... Thua thì tiến 1 bước, Thắng thì lùi 2 bước trong dãy số.',
    complexity: 'Trung Bình',
    complexityColor: 'text-amber-500',
    winRate: '72%',
    logicDescription: 'Logic: N_next = N_current + N_prev'
  },
  {
    id: 'labouchere',
    title: 'Labouchere System',
    tag: 'CANCELLATION',
    iconName: 'ListTree',
    description: 'Chiến thuật xóa số thông minh, giúp đạt mục tiêu lợi nhuận định sẵn.',
    instructions: 'Cược bằng tổng số đầu và số cuối của dãy số mục tiêu. Thắng xóa 2 số, thua thêm số vừa cược vào cuối dãy.',
    complexity: 'Cao',
    complexityColor: 'text-red-500',
    winRate: '68%',
    logicDescription: 'Logic: Bet = First + Last in Queue'
  },
  {
    id: 'oscars',
    title: "Oscar's Grind",
    tag: 'CONSERVATIVE',
    iconName: 'RotateCcw',
    description: 'Tăng mức cược khi thắng và giữ nguyên khi thua. Bảo toàn vốn tối đa.',
    instructions: 'Mục tiêu lãi 1 đơn vị. Thua giữ nguyên mức cược. Thắng tăng 1 đơn vị cho đến khi đạt mục tiêu lãi.',
    complexity: 'Trung Bình',
    complexityColor: 'text-amber-500',
    winRate: '65%',
    logicDescription: 'Logic: Stable loss, incremental win'
  },
  {
    id: 'dalembert',
    title: "D'Alembert Balanced",
    tag: 'BALANCED',
    iconName: 'Shuffle',
    description: 'Tăng 1 khi thua, giảm 1 khi thắng. Hệ thống cân bằng rủi ro bậc nhất.',
    instructions: 'Dựa trên lý thuyết cân bằng. Thua: +1 đơn vị. Thắng: -1 đơn vị (tối thiểu 1). Rất an toàn.',
    complexity: 'Thấp',
    complexityColor: 'text-emerald-500',
    winRate: '78%',
    logicDescription: 'Logic: Bet = Current +/- 1'
  },
  {
    id: 'paroli',
    title: "Paroli Power",
    tag: 'POSITIVE',
    iconName: 'Activity',
    description: 'Nhân đôi mức cược khi thắng để tận dụng chuỗi bệt (Dragon).',
    instructions: 'Chỉ tăng cược khi thắng (1-2-4). Thường dừng sau 3 ván thắng liên tiếp để chốt lời.',
    complexity: 'Trung Bình',
    complexityColor: 'text-amber-500',
    winRate: '60%',
    logicDescription: 'Logic: Double on Win, Reset on Loss'
  }
];

const getIcon = (name: string) => {
  switch (name) {
    case 'TrendingUp': return TrendingUp;
    case 'GitBranch': return GitBranch;
    case 'ListTree': return ListTree;
    case 'RotateCcw': return RotateCcw;
    case 'Shuffle': return Shuffle;
    case 'Activity': return Activity;
    case 'Repeat': return Repeat;
    case 'BarChart3': return BarChart3;
    case 'BrainCircuit': return BrainCircuit;
    case 'Zap': return Zap;
    case 'Layers': return Layers;
    case 'Sparkles': return Sparkles;
    case 'Sword': return Sword;
    case 'Waves': return Waves;
    default: return Info;
  }
};

interface FormulaGridProps {
  activeFormulaId: string | null;
  onApplyFormula: (id: string) => void;
}

const FormulaGrid: React.FC<FormulaGridProps> = ({ activeFormulaId, onApplyFormula }) => {
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);

  return (
    <div className="flex-1 px-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto h-full pb-32">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-orbitron font-bold text-white mb-2 uppercase tracking-tight">CÔNG THỨC</h2>
          <p className="text-xs font-bold text-amber-500 tracking-[0.3em] uppercase">Hệ thống thuật toán AI chuyên sâu</p>
        </div>
        <button className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center hover:bg-amber-500 transition-all group shadow-lg shadow-amber-500/5">
          <Plus size={24} className="text-amber-500 group-hover:text-black" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {formulas.map((formula) => {
          const Icon = getIcon(formula.iconName);
          const isActive = activeFormulaId === formula.id;

          return (
            <div 
              key={formula.id} 
              onClick={() => setSelectedFormula(formula)}
              className={`glass rounded-[35px] p-8 transition-all duration-500 group cursor-pointer relative overflow-hidden border ${isActive ? 'border-amber-500/50 bg-amber-500/5 shadow-[0_0_40px_rgba(245,158,11,0.15)]' : 'border-white/5 hover:border-amber-500/30'}`}
            >
               <div className={`absolute -inset-px bg-gradient-to-br from-amber-500/10 via-transparent to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}></div>
               
               {isActive && (
                 <div className="absolute top-6 right-8 flex items-center gap-2 bg-amber-500 border border-amber-400 px-4 py-1.5 rounded-full animate-in zoom-in-75 duration-500 shadow-lg shadow-amber-500/20">
                    <CheckCircle2 size={12} className="text-black" />
                    <span className="text-[10px] font-black text-black uppercase tracking-widest">ĐANG ÁP DỤNG</span>
                 </div>
               )}

               <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className={`w-16 h-16 rounded-[24px] border flex items-center justify-center group-hover:scale-110 transition-all duration-500 ${isActive ? 'bg-amber-500 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-zinc-900 border-white/10'}`}>
                      <Icon size={30} className={isActive ? 'text-black' : 'text-amber-500'} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                         <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-amber-500 transition-colors">{formula.title}</h3>
                         <span className="px-3 py-0.5 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-gray-500 tracking-widest uppercase">{formula.tag}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 italic">
                        {formula.description}
                      </p>
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/5 mb-8"></div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Độ phức tạp</p>
                        <p className={`text-base font-bold ${formula.complexityColor}`}>{formula.complexity}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Tỷ lệ thắng</p>
                        <p className="text-3xl font-orbitron font-black text-white italic tracking-tighter">{formula.winRate}</p>
                     </div>
                  </div>
               </div>
            </div>
          );
        })}
      </div>

      {selectedFormula && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="glass w-full max-w-2xl rounded-[45px] overflow-hidden relative border border-amber-500/30 shadow-[0_0_150px_rgba(0,0,0,0.8)]">
            <div className="h-36 bg-gradient-to-r from-amber-600/20 via-zinc-900 to-blue-600/20 flex items-center px-12 border-b border-white/10">
              <div className="w-20 h-20 rounded-[28px] bg-amber-500 border border-amber-400 flex items-center justify-center shadow-xl shadow-amber-500/20">
                {React.createElement(getIcon(selectedFormula.iconName), { size: 36, className: "text-black" })}
              </div>
              <div className="ml-8">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{selectedFormula.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                  <p className="text-amber-500 text-[10px] font-black tracking-[0.3em] uppercase">{selectedFormula.tag} ARCHITECTURE</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedFormula(null)}
                className="ml-auto w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all active:scale-95"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            <div className="p-12 space-y-10">
              <div>
                <h4 className="text-xs font-black text-amber-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                  <Zap size={16} /> CHI TIẾT VẬN HÀNH
                </h4>
                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                  <p className="text-gray-300 leading-relaxed text-lg font-medium italic">
                    "{selectedFormula.instructions}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                   <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Cơ chế Quản Lý Vốn</p>
                   <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                      <p className="text-white font-orbitron font-bold text-sm">{selectedFormula.logicDescription.split('|')[1]?.trim() || 'Dynamic Risk Control'}</p>
                   </div>
                </div>
                <div className="space-y-2 text-right">
                   <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Dự báo hiệu suất</p>
                   <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                      <p className="text-emerald-400 font-black tracking-widest text-xs uppercase">HIGH STABILITY</p>
                   </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setSelectedFormula(null)}
                  className="flex-1 h-16 rounded-2xl bg-zinc-900 border border-white/5 text-gray-400 font-bold uppercase tracking-widest hover:text-white transition-all hover:bg-zinc-800"
                >
                  Đóng lại
                </button>
                <button 
                  onClick={(e) => {
                    onApplyFormula(selectedFormula.id);
                    setSelectedFormula(null);
                  }}
                  className={`flex-1 h-16 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-3 ${activeFormulaId === selectedFormula.id ? 'bg-emerald-600 text-white cursor-default border-emerald-400 shadow-emerald-500/20' : 'bg-amber-500 text-black hover:bg-amber-400 hover:scale-[1.02] active:scale-95'}`}
                >
                  {activeFormulaId === selectedFormula.id ? (
                    <>
                      <CheckCircle2 size={20} /> ĐANG SỬ DỤNG
                    </>
                  ) : (
                    <>ÁP DỤNG NGAY</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormulaGrid;
