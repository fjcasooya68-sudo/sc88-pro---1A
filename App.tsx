
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import PredictionCard from './components/PredictionCard';
import ShoeAnalyzer from './components/ShoeAnalyzer';
import InputControls from './components/InputControls';
import FormulaGrid, { formulas } from './components/FormulaGrid';
import MonitoringView from './components/MonitoringView';
import CalculateView from './components/CalculateView';
import SettingsView from './components/SettingsView';
import LandingPage from './components/LandingPage';
import { Hand, PredictionResult, BetSide, AppSettings } from './types';
import { getAIPrediction } from './services/geminiService';

const STORAGE_KEY = 'SC88_PRO_V8_SESSION';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [history, setHistory] = useState<Hand[]>([]);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [activeFormulaId, setActiveFormulaId] = useState<string | null>('formula_pingpong_dragon');
  const [isSetupMode, setIsSetupMode] = useState(true);
  const [lossStreak, setLossStreak] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0); // State mới cho lợi nhuận
  const [settings, setSettings] = useState<AppSettings>({
    aiSensitivity: 85,
    aggressionLevel: 'MEDIUM',
    autoAnalyze: true,
    soundEnabled: true,
    detailedReasoning: true
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const p = JSON.parse(saved);
      setHistory(p.history || []);
      setLossStreak(p.lossStreak || 0);
      setTotalProfit(p.totalProfit || 0);
      setActiveFormulaId(p.activeFormulaId || 'formula_pingpong_dragon');
      setIsSetupMode(p.isSetupMode !== undefined ? p.isSetupMode : true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      history, 
      lossStreak, 
      totalProfit,
      activeFormulaId, 
      isSetupMode, 
      settings 
    }));
  }, [history, lossStreak, totalProfit, activeFormulaId, isSetupMode, settings]);

  const handleAnalyze = useCallback(async (newHistory: Hand[], currentLossStreak: number) => {
    if (newHistory.length === 0) return;
    setIsAnalyzing(true);
    const result = await getAIPrediction(newHistory, formulas.find(f => f.id === activeFormulaId), currentLossStreak);
    setPrediction(result);
    setIsAnalyzing(false);
  }, [activeFormulaId]);

  const addHand = (side: BetSide) => {
    let nextLoss = lossStreak;
    let nextProfit = totalProfit;
    
    // Xử lý thắng thua và lợi nhuận
    if (!isSetupMode && prediction && prediction.side !== 'WAIT' && side !== 'TIE') {
      const currentUnit = prediction.unit || 1;
      if (side === prediction.side) {
        nextLoss = 0; // Thắng -> Reset chuỗi cược
        nextProfit += currentUnit; // Cộng lãi
      } else {
        nextLoss = lossStreak + 1; // Thua -> Tăng chuỗi cược
        nextProfit -= currentUnit; // Trừ lỗ
      }
      setLossStreak(nextLoss);
      setTotalProfit(nextProfit);
    }
    
    const updated = [...history, { id: Math.random().toString(36).substr(2, 9), side, timestamp: Date.now() }];
    setHistory(updated);
    
    if (!isSetupMode && settings.autoAnalyze) {
      setTimeLeft(15);
      handleAnalyze(updated, nextLoss);
    }
  };

  if (!isAuthenticated) return <LandingPage onLogin={() => setIsAuthenticated(true)} />;

  return (
    <div className="flex bg-[#050505] text-white min-h-screen h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="px-10 py-8 flex justify-between items-end">
          <h2 className="text-xl font-orbitron font-bold tracking-widest uppercase">{activeTab}</h2>
          <div className="text-[10px] text-gray-500 font-bold tracking-[0.3em]">SC88 TERMINAL V8.5</div>
        </header>
        <div className="flex-1 px-10 py-4 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <>
              <PredictionCard 
                prediction={prediction} 
                isAnalyzing={isAnalyzing} 
                timeLeft={timeLeft} 
                isSetupMode={isSetupMode}
                totalProfit={totalProfit} // Truyền lợi nhuận vào Card
              />
              <ShoeAnalyzer 
                history={history} 
                isSetupMode={isSetupMode} 
                onApply={() => { setIsSetupMode(false); handleAnalyze(history, 0); }} 
                onReset={() => { if(confirm("Xóa data?")) { setHistory([]); setPrediction(null); setIsSetupMode(true); setLossStreak(0); setTotalProfit(0); localStorage.removeItem(STORAGE_KEY); }}} 
              />
              <InputControls onAddHand={addHand} />
            </>
          )}
          {activeTab === 'auto_graph' && <FormulaGrid activeFormulaId={activeFormulaId} onApplyFormula={(id) => { setActiveFormulaId(id); setActiveTab('dashboard'); }} />}
          {activeTab === 'monitoring' && <MonitoringView history={history} />}
          {activeTab === 'calculate' && <CalculateView history={history} />}
          {activeTab === 'settings' && <SettingsView settings={settings} onUpdateSettings={(u) => setSettings({...settings, ...u})} onResetData={() => { setHistory([]); setIsSetupMode(true); setLossStreak(0); setTotalProfit(0); }} />}
        </div>
        <footer className="px-10 py-4 border-t border-white/5 bg-black/40 flex justify-between text-[10px] font-bold text-gray-600">
          <div className="flex gap-8">
            <span className="text-amber-500 uppercase">Strategy: {formulas.find(f => f.id === activeFormulaId)?.title}</span>
            <span>Hands: {history.length}</span>
            <span className="text-red-500">Loss Streak: {lossStreak}</span>
            <span className={totalProfit >= 0 ? 'text-emerald-500' : 'text-red-500'}>Profit: {totalProfit}%</span>
          </div>
          <span className="text-emerald-500">Auto-Save: ACTIVE</span>
        </footer>
      </main>
    </div>
  );
};

export default App;
