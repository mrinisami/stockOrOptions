export interface CompanyInfo {
  cieName: string;
  marketCap: number;
  ticker: string;
  startDate: string;
}
export interface CompaniesInfo {
  cieData: CompanyInfo[];
}
