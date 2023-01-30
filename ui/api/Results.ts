export interface YearData {
  year: number;
  stock: SimpleStats;
  option: SimpleStats;
}

export interface SimpleStats {
  profit: number;
  returnRate: number;
}

export interface CompanyData {
  symbol: string;
  years: YearData[];
}

export interface ComparatorData {
  companies: CompanyData[];
}

export interface YearDataMaxRet {
  year: number;
  returnRate: number;
  meanProfit: number;
  financialAsset: string;
}

export interface CompanyDataMaxRet {
  symbol: string;
  years: YearDataMaxRet[];
}

export interface ComparatorDataMaxRet {
  companies: CompanyDataMaxRet[];
}
