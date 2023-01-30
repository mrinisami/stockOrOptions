import React from "react";
import { Table, TableRow, TableBody, TableCell, TableHead, Typography } from "@mui/material";
import { Stats } from "../../../utils/statGenerator";
import RowFiller from "./RowFiller";
import { StatsMaxRet } from "../../../utils/statGeneratorMaxRet";

export interface ChosenStats {
  cie: Stats | StatsMaxRet;
  rank: number;
}

interface Props {
  displayedStats: ChosenStats[];
  ticker: string;
}

export default (props: Props) => {
  const chosenStats = props.displayedStats.filter((company) => company.cie.company.symbol === props.ticker)[0];
  console.log(props.ticker);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Rank
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Ticker
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Profit
            </Typography>
          </TableCell>
          <TableCell sx={{ flexWrap: "nowrap" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Return (yearly)
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.displayedStats.slice(0, 3).map((companyStats: ChosenStats) => (
          <RowFiller
            displayedStats={companyStats.cie}
            key={companyStats.cie.company.symbol}
            rank={companyStats.rank + 1}
            color={companyStats.cie.company.symbol === props.ticker ? "lightgreen" : ""}
          />
        ))}
        {renderChosenStats()}
      </TableBody>
    </Table>
  );
  function renderChosenStats() {
    if (chosenStats.rank < 3) {
      return <></>;
    }
    return <RowFiller displayedStats={chosenStats.cie} rank={chosenStats.rank + 1} color="lightgreen" />;
  }
};
