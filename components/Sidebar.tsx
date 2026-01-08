
import React from 'react';
import { LayoutDashboard, TrendingUp, MonitorPlay, Calculator, Settings, Cpu } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'dashboard', subLabel: 'TỔNG QUAN' },
    { id: 'auto_graph', icon: TrendingUp, label: 'auto_graph', subLabel: 'CÔNG THỨC' },
    { id: 'monitoring', icon: MonitorPlay, label: 'monitoring', subLabel: 'BIỂU ĐỒ' },
    { id: 'calculate', icon: Calculator, label: 'calculate', subLabel: 'XÁC SUẤT' },
    { id: 'settings', icon: Settings, label: 'settings', subLabel: 'CÀI ĐẶT' },
  ];

  return (
    <div className="w-64 min-h-screen bg-black flex flex-col border-r border-white/5 p-6">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center glow-orange">
             <Cpu className="text-black" size={24} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-orbitron font-bold tracking-wider text-amber-500">SC88 <span className="text-white">PRO</span></h1>
            <span className="text-[8px] tracking-[0.2em] text-gray-500 font-bold">EXCLUSIVE BACCARAT</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg glow-orange translate-x-1' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={22} className={activeTab === item.id ? 'text-white' : 'text-gray-400'} />
            <div className="text-left">
              <p className="text-sm font-bold uppercase tracking-wide leading-none mb-1">{item.label}</p>
              <p className={`text-[10px] ${activeTab === item.id ? 'text-amber-100' : 'text-gray-600'}`}>{item.subLabel}</p>
            </div>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="bg-zinc-900/50 rounded-xl p-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">System Status</p>
            <p className="text-xs text-green-400 font-orbitron">ENCRYPTED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
