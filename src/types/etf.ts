export interface EtfQuote {
  code: string;
  name: string;
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  amount: number;
  changePercent: number;
}

export interface TradingSignal {
  action: "BUY" | "SELL" | "HOLD";
  confidence: number;
  reasons: string[];
}

export interface StrategySnapshot {
  sma5: number;
  sma20: number;
  sma60: number;
  rsi14: number;
  macd: number;
  signal: number;
  histogram: number;
}
