import React, { useMemo, useState } from "react";
import { fetchEtfDailyData } from "../services/etfService";
import { buildStrategySnapshot, getDailyTradingSignal } from "../strategies/tradingStrategy";
import { EtfQuote } from "../types/etf";

const ACTION_LABEL: { [key: string]: string } = {
  BUY: "买入",
  SELL: "卖出",
  HOLD: "观望"
};

const RECOMMENDED_CODES = ["510300", "510500", "510050", "159915", "159919", "588000"];

const App: React.FC = function() {
  const [code, setCode] = useState("510300");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quotes, setQuotes] = useState<EtfQuote[]>([]);

  const signal = useMemo(function() {
    return quotes.length > 0 ? getDailyTradingSignal(quotes) : null;
  }, [quotes]);

  const snapshot = useMemo(function() {
    return quotes.length > 0 ? buildStrategySnapshot(quotes) : null;
  }, [quotes]);

  const latest = quotes.length > 0 ? quotes[quotes.length - 1] : null;

  async function onAnalyze() {
    setError("");
    setLoading(true);
    try {
      const result = await fetchEtfDailyData(code);
      setQuotes(result);
    } catch (e) {
      const message = e instanceof Error ? e.message : "加载失败，请稍后重试。";
      setError(message);
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>中国ETF日线策略助手</h1>
      <p>输入沪深ETF代码，系统会结合均线、RSI、MACD三类主流策略，给出日线级别交易建议。</p>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
        <input
          value={code}
          onChange={function(e) {
            setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
          }}
          placeholder="请输入6位ETF代码"
          style={{ fontSize: 16, padding: "8px 10px", width: 220 }}
        />
        <button onClick={onAnalyze} disabled={loading} style={{ padding: "9px 14px", cursor: "pointer" }}>
          {loading ? "分析中..." : "获取行情并生成建议"}
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        常用ETF：
        {RECOMMENDED_CODES.map(function(item) {
          return (
            <button
              key={item}
              style={{ marginLeft: 8, padding: "4px 8px", cursor: "pointer" }}
              onClick={function() {
                setCode(item);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>

      {error && <div style={{ color: "#b71c1c", marginBottom: 12 }}>{error}</div>}

      {latest && signal && snapshot && (
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, background: "#fafafa" }}>
          <h2>
            {latest.name}（{latest.code}）- {latest.date}
          </h2>
          <p>
            最新收盘价：<strong>{latest.close.toFixed(3)}</strong>，涨跌幅：
            <strong style={{ color: latest.changePercent >= 0 ? "#c62828" : "#1565c0" }}>
              {latest.changePercent.toFixed(2)}%
            </strong>
          </p>
          <p>
            策略建议：
            <strong
              style={{
                color:
                  signal.action === "BUY" ? "#2e7d32" : signal.action === "SELL" ? "#c62828" : "#ef6c00"
              }}
            >
              {ACTION_LABEL[signal.action]}（置信度 {signal.confidence}%）
            </strong>
          </p>

          <h3>核心指标（日线）</h3>
          <ul>
            <li>5日均线：{snapshot.sma5.toFixed(3)}</li>
            <li>20日均线：{snapshot.sma20.toFixed(3)}</li>
            <li>60日均线：{snapshot.sma60.toFixed(3)}</li>
            <li>RSI(14)：{snapshot.rsi14.toFixed(2)}</li>
            <li>
              MACD(DIF/DEA/HIST)：{snapshot.macd.toFixed(4)} / {snapshot.signal.toFixed(4)} / {snapshot.histogram.toFixed(4)}
            </li>
          </ul>

          <h3>建议依据</h3>
          <ul>
            {signal.reasons.map(function(reason) {
              return <li key={reason}>{reason}</li>;
            })}
          </ul>
          <p style={{ color: "#666", marginTop: 8 }}>
            风险提示：该建议基于量化规则自动生成，不构成投资建议，请结合仓位管理与个人风险偏好。
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
