import axios from "axios";
import { EtfQuote } from "../types/etf";

interface EastMoneyResponse {
  data?: {
    code: string;
    name: string;
    klines: string[];
  };
}

const ETF_MARKET_MAP: { [code: string]: string } = {
  "510300": "1",
  "510500": "1",
  "510050": "1",
  "159915": "0",
  "159919": "0",
  "512100": "1",
  "588000": "1"
};

function resolveSecid(code: string): string {
  if (ETF_MARKET_MAP[code]) {
    return ETF_MARKET_MAP[code] + "." + code;
  }

  if (code.startsWith("5") || code.startsWith("6")) {
    return "1." + code;
  }

  return "0." + code;
}

function parseKline(raw: string, code: string, name: string): EtfQuote {
  const parts = raw.split(",");
  return {
    code,
    name,
    date: parts[0],
    open: Number(parts[1]),
    close: Number(parts[2]),
    high: Number(parts[3]),
    low: Number(parts[4]),
    volume: Number(parts[5]),
    amount: Number(parts[6]),
    changePercent: Number(parts[8])
  };
}

export async function fetchEtfDailyData(code: string): Promise<EtfQuote[]> {
  const cleanedCode = code.trim();
  if (!/^\d{6}$/.test(cleanedCode)) {
    throw new Error("ETF代码格式错误，请输入6位数字代码（如 510300）。");
  }

  const response = await axios.get<EastMoneyResponse>(
    "https://push2his.eastmoney.com/api/qt/stock/kline/get",
    {
      params: {
        secid: resolveSecid(cleanedCode),
        klt: "101",
        fqt: "1",
        lmt: "260",
        end: "20500000",
        iscca: "1",
        fields1: "f1,f2,f3,f4,f5,f6",
        fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61"
      }
    }
  );

  if (!response.data || !response.data.data || !response.data.data.klines) {
    throw new Error("未获取到行情数据，请检查ETF代码是否正确。");
  }

  const info = response.data.data;
  return info.klines.map(function(item) {
    return parseKline(item, info.code, info.name);
  });
}
