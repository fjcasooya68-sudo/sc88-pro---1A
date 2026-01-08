
import { GoogleGenAI, Type } from "@google/genai";
import { Hand, PredictionResult, Formula } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIPrediction = async (
  history: Hand[], 
  activeFormula?: Formula | null,
  lossStreak: number = 0
): Promise<PredictionResult> => {
  const stakingSequence = [1, 3, 7, 15, 31, 63];
  
  const getProgressiveUnit = (streak: number) => {
    return stakingSequence[Math.min(streak, stakingSequence.length - 1)];
  };

  const getPingPongDragonSide = (history: Hand[]) => {
    if (history.length < 2) return history.length === 1 ? (history[0].side === 'BANKER' ? 'PLAYER' : 'BANKER') : 'BANKER';
    const lastTwo = history.slice(-2);
    if (lastTwo[0].side === lastTwo[1].side && lastTwo[0].side !== 'TIE') {
      return lastTwo[1].side;
    }
    return lastTwo[1].side === 'BANKER' ? 'PLAYER' : 'BANKER';
  };

  const currentUnit = getProgressiveUnit(lossStreak);

  // MOCK LOGIC (Fallback)
  if (!process.env.API_KEY) {
    let side: any = 'BANKER';
    if (activeFormula?.id === 'formula_pingpong_dragon') {
      side = getPingPongDragonSide(history);
    } else {
      side = Math.random() > 0.5 ? 'BANKER' : 'PLAYER';
    }

    return {
      side,
      confidence: Math.floor(Math.random() * 40) + 55, // 55% - 95%
      unit: currentUnit,
      reasoning: `[MOCK] ${activeFormula?.title}. Chuỗi thua: ${lossStreak}. Mức cược: ${currentUnit}%.`
    };
  }

  const historyString = history.map(h => h.side[0]).join(', ');

  const prompt = `
    Bạn là hệ thống AI phân tích Baccarat chuyên nghiệp. 
    Lịch sử gần đây: [${historyString}]. 
    Chiến thuật đang chạy: ${activeFormula?.title || 'General'}. 
    
    YÊU CẦU QUAN TRỌNG:
    1. Dự đoán ván tiếp theo (BANKER hoặc PLAYER).
    2. Tỷ lệ tự tin (confidence): Trả về một số nguyên từ 51 đến 99 (Ví dụ: 85). TUYỆT ĐỐI KHÔNG dùng số thập phân như 0.85.
    3. Đơn vị cược (unit): Luôn trả về giá trị ${currentUnit} vì người dùng đang ở chuỗi thua ${lossStreak}.
    
    TRẢ VỀ JSON: { "side": "BANKER/PLAYER", "confidence": 85, "unit": ${currentUnit}, "reasoning": "..." }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            side: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            unit: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ["side", "confidence", "unit", "reasoning"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    
    // Xử lý an toàn: Nếu AI trả về 0.85 thay vì 85, ta nhân 100
    let finalConfidence = Number(data.confidence);
    if (finalConfidence < 1 && finalConfidence > 0) {
      finalConfidence = Math.round(finalConfidence * 100);
    } else {
      finalConfidence = Math.round(finalConfidence);
    }
    
    // Đảm bảo không dưới 51%
    if (finalConfidence < 51 && finalConfidence > 0) finalConfidence = 51 + Math.floor(Math.random() * 5);

    return {
      side: (data.side === 'BANKER' || data.side === 'PLAYER') ? data.side : 'WAIT',
      confidence: finalConfidence,
      unit: currentUnit, // Ưu tiên logic code để đảm bảo 1-3-7-15-31-63 chính xác
      reasoning: data.reasoning || "Dựa trên phân tích xu hướng cầu."
    };
  } catch (error) {
    console.error("AI Error:", error);
    return { 
      side: 'WAIT', 
      confidence: 0, 
      unit: currentUnit, 
      reasoning: "Lỗi kết nối AI. Vui lòng thử lại." 
    };
  }
};
