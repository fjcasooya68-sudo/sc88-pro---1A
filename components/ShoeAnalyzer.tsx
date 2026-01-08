import React, { useMemo } from 'react';
import { Layers, CheckCircle2, RotateCcw } from 'lucide-react';
import { Hand, BetSide } from '../types';

interface BigRoadCell extends Hand {
  tieCount: number;
  row: number;
  col: number;
}

interface ShoeAnalyzerProps {
  history: Hand[];
  isSetupMode: boolean;
  onApply: () => void;
  onReset: () => void;
}

const ShoeAnalyzer: React.FC<ShoeAnalyzerProps> = ({ history, isSetupMode, onApply, onReset }) => {
  const getHandStyles = (side: BetSide) => {
    switch(side) {
      case 'BANKER': return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
      case 'PLAYER': return 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]';
      case 'TIE': return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
      default: return 'bg-gray-600';
    }
  };

  const bigRoadCells = useMemo(() => {
    if (history.length === 0) return [];
    const cells: BigRoadCell[] = [];
    const occupied: Record<string, boolean> = {};

    let lastSide: BetSide | null = null;
    let lastRow = 0;
    let lastCol = 0;
    let startCol = 0;

    history.forEach((hand) => {
      // Logic for handling Tie results by incrementing tieCount on the last placed cell
      if (hand.side === 'TIE') {
        if (cells.length > 0) {
          const lastCell = cells[cells.length - 1];
          lastCell.tieCount++;
        } else {
          const cell: BigRoadCell = { ...hand, tieCount: 1, row: 0, col: 0 };
          cells.push(cell);
          occupied["0-0"] = true;
          lastSide = 'TIE';
        }
        return;
      }

      // Fix: Adjusted logical order to prevent TS narrowing error. 
      // Checking 'lastSide === 'TIE'' first ensures that in the third check, 
      // 'lastSide' is narrowed to exclude 'TIE' before comparison with 'hand.side'.
      // At this point, hand.side is known to be NOT 'TIE' because of the return above.
      if (lastSide === null || lastSide === 'TIE' || hand.side !== lastSide) {
        let col = startCol;
        if (lastSide !== null && lastSide !== 'TIE') col++;
        while (occupied[`${col}-0`]) col++;
        
        const cell: BigRoadCell = { ...hand, tieCount: 0, row: 0, col };
        cells.push(cell);
        occupied[`${col}-0`] = true;
        lastSide = hand.side;
        lastRow = 0;
        lastCol = col;
        startCol = col;
      } else {
        let nextRow = lastRow + 1;
        let nextCol = lastCol;
        if (nextRow >= 6 || occupied[`${nextCol}-${nextRow}`]) {
          nextRow = lastRow;
          nextCol = lastCol + 1;
          while (occupied[`${nextCol}-${nextRow}`]) nextCol++;
        }
        const cell: BigRoadCell = { ...hand, tieCount: 0, row: nextRow, col: nextCol };
        cells.push(cell);
        occupied[`${nextCol}-${nextRow}`] = true;
        lastRow = nextRow;
        lastCol = nextCol;
      }
    });
    return cells;
  }, [history]);

  const maxCol = useMemo(() => Math.max(15, ...bigRoadCells.map(c => c.col)), [bigRoadCells]);

  return (
    <div className={`glass rounded-3xl p-8 mb-8 relative transition-all duration-500 ${isSetupMode ? 'border-amber-500/30' : 'border-white/5'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-amber-500/20 bg-amber-500/10 rounded-xl flex items-center justify-center">
            <Layers className="text-amber-500" size={20} />
          </div>
          <h3 className="text-sm font-bold tracking-[0.1em] text-white uppercase">
            LỘ TRÌNH CẦU <span className="text-amber-500/50">•</span> BIG ROAD
          </h3>
        </div>
        <div className="flex gap-3">
          <button onClick={onReset} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 uppercase">Làm mới</button>
          {isSetupMode && (
            <button onClick={onApply} disabled={history.length === 0} className="px-6 py-1.5 bg-amber-500 rounded-xl text-[10px] font-black text-black uppercase shadow-lg shadow-amber-500/20">Áp dụng</button>
          )}
        </div>
      </div>

      <div className="bg-black/40 rounded-2xl p-6 overflow-x-auto custom-scrollbar">
        {history.length === 0 ? (
          <div className="h-[180px] flex items-center justify-center text-gray-600 italic text-sm">Nhập dữ liệu...</div>
        ) : (
          <div className="grid gap-2 relative h-[180px]" style={{ gridTemplateRows: 'repeat(6, 28px)', gridTemplateColumns: `repeat(${maxCol + 1}, 28px)`, gridAutoFlow: 'column' }}>
            {bigRoadCells.map((cell) => (
              <div key={cell.id} style={{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }} className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white relative ${getHandStyles(cell.side)}`}>
                <span>{cell.side[0]}</span>
                {cell.tieCount > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[140%] h-[2px] bg-green-400 rotate-45 shadow-[0_0_5px_rgba(74,222,128,0.8)]"></div>
                    {cell.tieCount > 1 && <span className="absolute bottom-0 right-0.5 text-[7px] text-green-300 bg-black/60 rounded-full px-0.5">{cell.tieCount}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoeAnalyzer;