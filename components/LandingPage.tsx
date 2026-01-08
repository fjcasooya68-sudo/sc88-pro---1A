
import React from 'react';
import { Rocket, Lock, Shield, Zap, Cpu } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 blur-[120px] rounded-full"></div>
      
      <div className="w-full max-w-[450px] relative z-10 flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-12 flex flex-col items-center">
          <div className="w-28 h-28 bg-gradient-to-br from-amber-400 to-amber-600 rounded-[35px] flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)] mb-8 transform hover:scale-105 transition-transform duration-500">
            <div className="flex flex-col items-center leading-none">
              <span className="text-3xl font-black text-white tracking-tighter">SC</span>
              <span className="text-3xl font-black text-white tracking-tighter">88</span>
            </div>
          </div>
          
          <h1 className="text-5xl font-orbitron font-black italic tracking-tighter text-white mb-3">
            SC88 PRO
          </h1>
          
          <p className="text-amber-500 font-bold tracking-[0.4em] uppercase text-sm mb-1">
            Độc Quyền Baccarat
          </p>
          <p className="text-gray-500 font-medium tracking-widest text-[10px] uppercase">
            Hệ thống phân tích AI chuyên sâu
          </p>
        </div>

        {/* Buttons Section */}
        <div className="w-full space-y-4 mb-20">
          <button 
            onClick={onLogin}
            className="w-full h-16 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full flex items-center justify-center gap-3 group hover:shadow-[0_0_30px_rgba(217,119,6,0.4)] transition-all duration-300 active:scale-95"
          >
            <Rocket className="text-white group-hover:animate-bounce" size={20} />
            <span className="text-white font-bold tracking-[0.15em] text-sm uppercase">Trải nghiệm ngay</span>
          </button>

          <button 
            className="w-full h-16 bg-zinc-900/50 border border-white/5 rounded-full flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all duration-300 active:scale-95"
          >
            <Lock className="text-white/60" size={18} />
            <span className="text-white/80 font-bold tracking-[0.15em] text-sm uppercase">Đăng nhập VIP</span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8"></div>

        {/* Footer Features */}
        <div className="w-full grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center gap-2">
            <Shield className="text-gray-500" size={18} />
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Bảo mật</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="text-gray-500" size={18} />
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Tốc độ</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Cpu className="text-gray-500" size={18} />
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">AI Core</span>
          </div>
        </div>

        <p className="text-[9px] text-gray-600 font-bold tracking-[0.25em] uppercase">
          Powered by SC88 Cloud • V8.5
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
