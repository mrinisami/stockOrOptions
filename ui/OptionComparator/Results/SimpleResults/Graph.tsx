import React from "react";
import { CompanyInfo } from "../../../api/CompaniesInfos";
import { createGraph } from "../../../utils/graphData";
import { Stats } from "../../../utils/statGenerator";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface ChosenStats {
  cie: Stats;
  rank: number;
}

interface Props {
  optionStats: Stats[];
  stockStats: Stats[];
}

export default (props: Props) => {
  const config = createGraph(props.optionStats, props.stockStats);

  return <Bar data={config.data} options={config.options} />;
};
