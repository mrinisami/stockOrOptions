import { CompanyData, SimpleStats } from "../api/Results";

export interface Stats {
  stats: SimpleStats;
  company: CompanyData;
}

export function topPerformerStat(
  companies: CompanyData[],
  nomValue: number,
  backTestLength: number,
  instrument: "stock" | "option"
): Stats[] {
  const usedStats = companies.map((companie) => {
    const stats: Stats = { stats: { profit: 0, returnRate: 0 }, company: companie };
    stats.stats.profit = companie.years.reduce((sum, year) => year[instrument].profit + sum, 0);
    stats.stats.returnRate = calculateReturn(stats.stats.profit, nomValue, backTestLength);
    return stats;
  });
  return usedStats;
}

export function topPerformerStatYearly(companies: CompanyData[], instrument: "stock" | "option", chosenYear: number) {
  const usedStats = companies.map((company) => {
    const yearData = company.years.filter((year) => year.year === chosenYear)[0];
    const stats: Stats = {
      stats: { profit: yearData[instrument].profit, returnRate: yearData[instrument].returnRate },
      company: company
    };
    return stats;
  });

  return usedStats;
}

function calculateReturn(profit: number, nomValue: number, period: number): number {
  let minRate = -1.5;
  let maxRate = 2;
  let guess = (maxRate + minRate) / 2;
  let fv = 10;
  do {
    guess = (maxRate + minRate) / 2;
    fv = nomValue * ((Math.pow(1 + guess, period) - 1) / guess) * (1 + guess);
    if (fv < profit) {
      minRate = guess;
    } else {
      maxRate = guess;
    }
  } while (Math.abs(fv - profit) > 1);

  return guess;
}

interface CieStats {
  optionProfit: number;
  optionNbWins: number;
  optionNbOfRetOverBmk: number;
  stockProfit: number;
  stockNbWins: number;
  stockNbOfRetOverBmk: number;
}

export function aggregateStatsYearly(companies: CompanyData[], bmk: number, chosenYear: number): CieStats {
  const stats = companies.map((cie) => {
    const yearData = cie.years.filter((year) => year.year === chosenYear)[0];
    const cieStats: CieStats = {
      optionProfit: 0,
      optionNbWins: 0,
      optionNbOfRetOverBmk: 0,
      stockProfit: 0,
      stockNbWins: 0,
      stockNbOfRetOverBmk: 0
    };
    cieStats.optionProfit = yearData.option.profit;
    cieStats.stockProfit = yearData.stock.profit;
    cieStats.optionNbWins = cieStats.optionProfit > cieStats.stockProfit ? 1 : 0;
    cieStats.optionNbOfRetOverBmk = cieStats.optionProfit > bmk ? 1 : 0;
    cieStats.stockNbWins = cieStats.optionProfit > cieStats.stockProfit ? 0 : 1;
    cieStats.stockNbOfRetOverBmk = cieStats.stockProfit > bmk ? 1 : 0;
    return cieStats;
  });
  const avgOptionProfit = stats.reduce((sum, cie) => cie.optionProfit + sum, 0) / companies.length;
  const avgStockProfit = stats.reduce((sum, cie) => cie.stockProfit + sum, 0) / companies.length;
  const optionNbWins = stats.reduce((sum, cie) => cie.optionNbWins + sum, 0);
  const stockNbWins = stats.reduce((sum, cie) => cie.stockNbWins + sum, 0);
  const optionAboveBmk = stats.reduce((sum, cie) => cie.optionNbOfRetOverBmk + sum, 0);
  const stockAboveBmk = stats.reduce((sum, cie) => cie.stockNbOfRetOverBmk + sum, 0);
  const combinedStats: CieStats = {
    optionProfit: avgOptionProfit,
    optionNbWins: optionNbWins,
    optionNbOfRetOverBmk: optionAboveBmk,
    stockProfit: avgStockProfit,
    stockNbWins: stockNbWins,
    stockNbOfRetOverBmk: stockAboveBmk
  };
  return combinedStats;
}

export function aggregateStats(companies: CompanyData[], bmk: number): CieStats {
  const stats = companies.map((cie) => {
    const cieStats: CieStats = {
      optionProfit: 0,
      optionNbWins: 0,
      optionNbOfRetOverBmk: 0,
      stockProfit: 0,
      stockNbWins: 0,
      stockNbOfRetOverBmk: 0
    };
    cieStats.optionProfit = cie.years.reduce((sum, year) => year.option.profit + sum, 0);
    cieStats.optionNbWins = cie.years.filter((year) => year.option.profit > year.stock.profit).length;
    cieStats.optionNbOfRetOverBmk = cie.years.filter((year) => year.option.returnRate > bmk).length;
    cieStats.stockProfit = cie.years.reduce((sum, year) => year.stock.profit + sum, 0);
    cieStats.stockNbWins = cie.years.length - cieStats.optionNbWins;
    cieStats.stockNbOfRetOverBmk = cie.years.filter((year) => year.stock.returnRate > bmk).length;
    return cieStats;
  });
  const avgOptionProfit = stats.reduce((sum, cie) => cie.optionProfit + sum, 0) / companies.length;
  const avgStockProfit = stats.reduce((sum, cie) => cie.stockProfit + sum, 0) / companies.length;
  const optionNbWins = stats.reduce((sum, cie) => cie.optionNbWins + sum, 0);
  const stockNbWins = stats.reduce((sum, cie) => cie.stockNbWins + sum, 0);
  const optionAboveBmk = stats.reduce((sum, cie) => cie.optionNbOfRetOverBmk + sum, 0);
  const stockAboveBmk = stats.reduce((sum, cie) => cie.stockNbOfRetOverBmk + sum, 0);
  const combinedStats: CieStats = {
    optionProfit: avgOptionProfit,
    optionNbWins: optionNbWins,
    optionNbOfRetOverBmk: optionAboveBmk,
    stockProfit: avgStockProfit,
    stockNbWins: stockNbWins,
    stockNbOfRetOverBmk: stockAboveBmk
  };
  return combinedStats;
}
