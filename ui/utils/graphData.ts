import { ChosenStats } from "../OptionComparator/Results/SimpleResults/Graph";
import { Stats } from "./statGenerator";

export function createGraph(optionStats: Stats[], stockStats: Stats[]) {
  const labels: string[] = [];
  const optionData: number[] = [];
  const stockData: number[] = [];
  optionStats.forEach((company) => {
    labels.push(company.company.symbol);
    optionData.push(company.stats.profit);
  });
  stockStats.forEach((company) => {
    stockData.push(company.stats.profit);
  });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Option",
        data: optionData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      },
      {
        label: "Stock",
        data: stockData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };
  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const
      },
      title: {
        display: true,
        text: "Profit"
      }
    }
  };
  return { data, options };
}
