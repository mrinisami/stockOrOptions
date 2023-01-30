import { CompanyDataMaxRet, SimpleStats } from "../api/Results";
import { calculateReturn } from "./statGenerator";

export interface StatsMaxRet {
  stats: SimpleStats;
  company: CompanyDataMaxRet;
  optionCounter: number;
  stockCounter: number;
}

export function topPerformerStat(
  companies: CompanyDataMaxRet[],
  nomValue: number,
  backTestLength: number
): StatsMaxRet[] {
  const nbYears = companies[0].years.length;
  const usedStats = companies.map((companie) => {
    const stats: StatsMaxRet = {
      stats: { profit: 0, returnRate: 0 },
      company: companie,
      optionCounter: 0,
      stockCounter: 0
    };
    stats.stats.profit = companie.years.reduce((sum, year) => year.meanProfit + sum, 0);
    stats.optionCounter = companie.years.reduce((sum, year) => {
      if (year.financialAsset === "option") {
        sum += 1;
      }
      return sum;
    }, 0);
    stats.stockCounter = nbYears - stats.optionCounter;
    stats.stats.returnRate = calculateReturn(stats.stats.profit, nomValue, backTestLength);
    return stats;
  });
  return usedStats;
}

export function topPerformerStatYearly(companies: CompanyDataMaxRet[], chosenYear: number): StatsMaxRet[] {
  const usedStats = companies.map((companie) => {
    const yearData = companie.years.filter((year) => year.year === chosenYear)[0];
    const stats: StatsMaxRet = {
      stats: { profit: yearData.meanProfit, returnRate: yearData.returnRate },
      company: companie,
      optionCounter: 0,
      stockCounter: 0
    };
    yearData.financialAsset === "stock" ? (stats.optionCounter = 0) : (stats.stockCounter = 1);
    return stats;
  });
  return usedStats;
}
