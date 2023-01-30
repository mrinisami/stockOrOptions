import React from "react";
import { TableRow, TableCell, Typography } from "@mui/material";
import { StatsMaxRet } from "../../../utils/statGeneratorMaxRet";

interface Props {
  displayedStats: StatsMaxRet;
  rank: number;
}

export default (props: Props) => {
  const returnFormatted = `${(props.displayedStats.stats.returnRate * 100).toFixed(2)}%`;
  return (
    <TableRow>
      <TableCell>
        <Typography>{props.rank}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.displayedStats.company.symbol}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.displayedStats.stats.profit.toFixed(2)}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{returnFormatted}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.displayedStats.optionCounter}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.displayedStats.stockCounter}</Typography>
      </TableCell>
    </TableRow>
  );
};
