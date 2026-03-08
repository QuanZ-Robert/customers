import { EtfQuote, StrategySnapshot, TradingSignal } from "../types/etf";

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  const sum = values.reduce(function(acc, current) {
    return acc + current;
  }, 0);
  return sum / values.length;
}

function calculateSMA(closes: number[], period: number): number {
  if (closes.length < period) {
    return 0;
  }
  return average(closes.slice(closes.length - period));
}

function calculateRSI(closes: number[], period: number): number {
  if (closes.length <= period) {
    return 50;
  }

  let gains = 0;
  let losses = 0;

  for (let i = closes.length - period; i < closes.length; i += 1) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) {
      gains += diff;
    } else {
      losses += Math.abs(diff);
    }
  }

  if (losses === 0) {
    return 100;
  }

  const rs = gains / losses;
  return 100 - 100 / (1 + rs);
}

function calculateEMA(series: number[], period: number): number[] {
  if (series.length === 0) {
    return [];
  }

  const multiplier = 2 / (period + 1);
  const emaValues: number[] = [series[0]];

  for (let i = 1; i < series.length; i += 1) {
    const value = (series[i] - emaValues[i - 1]) * multiplier + emaValues[i - 1];
    emaValues.push(value);
  }

  return emaValues;
}

function calculateMACD(closes: number[]): { macd: number; signal: number; histogram: number } {
  if (closes.length < 35) {
    return { macd: 0, signal: 0, histogram: 0 };
  }

  const ema12 = calculateEMA(closes, 12);
  const ema26 = calculateEMA(closes, 26);
  const dif = ema12.map(function(value, index) {
    return value - ema26[index];
  });
  const signalLine = calculateEMA(dif, 9);

  const macd = dif[dif.length - 1];
  const signal = signalLine[signalLine.length - 1];

  return {
    macd,
    signal,
    histogram: macd - signal
  };
}

export function buildStrategySnapshot(data: EtfQuote[]): StrategySnapshot {
  const closes = data.map(function(item) {
    return item.close;
  });
  const macdResult = calculateMACD(closes);

  return {
    sma5: calculateSMA(closes, 5),
    sma20: calculateSMA(closes, 20),
    sma60: calculateSMA(closes, 60),
    rsi14: calculateRSI(closes, 14),
    macd: macdResult.macd,
    signal: macdResult.signal,
    histogram: macdResult.histogram
  };
}

export function getDailyTradingSignal(data: EtfQuote[]): TradingSignal {
  if (data.length < 60) {
    return {
      action: "HOLD",
      confidence: 0,
      reasons: ["历史数据不足60个交易日，建议继续观察。"]
    };
  }

  const snapshot = buildStrategySnapshot(data);
  const latest = data[data.length - 1];
  const reasons: string[] = [];
  let score = 0;

  if (latest.close > snapshot.sma20 && snapshot.sma20 > snapshot.sma60) {
    score += 2;
    reasons.push("趋势向上：收盘价位于20日线上方，且20日线上穿60日线。");
  } else if (latest.close < snapshot.sma20 && snapshot.sma20 < snapshot.sma60) {
    score -= 2;
    reasons.push("趋势向下：收盘价位于20日线下方，且20日线弱于60日线。");
  }

  if (snapshot.rsi14 < 30) {
    score += 1;
    reasons.push("RSI低于30，出现超卖特征，存在反弹机会。");
  } else if (snapshot.rsi14 > 70) {
    score -= 1;
    reasons.push("RSI高于70，存在短线过热风险。");
  }

  if (snapshot.macd > snapshot.signal && snapshot.histogram > 0) {
    score += 1;
    reasons.push("MACD金叉且柱状图为正，多头动能增强。");
  } else if (snapshot.macd < snapshot.signal && snapshot.histogram < 0) {
    score -= 1;
    reasons.push("MACD死叉且柱状图为负，空头动能增强。");
  }

  let action: "BUY" | "SELL" | "HOLD" = "HOLD";
  if (score >= 2) {
    action = "BUY";
  } else if (score <= -2) {
    action = "SELL";
  }

  const confidence = Math.min(95, Math.max(20, 50 + score * 15));

  if (reasons.length === 0) {
    reasons.push("多策略信号未形成一致方向，建议观望。");
  }

  return {
    action,
    confidence,
    reasons
  };
}
