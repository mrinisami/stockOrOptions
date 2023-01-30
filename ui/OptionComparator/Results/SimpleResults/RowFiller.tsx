import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { Stats } from "../../../utils/statGenerator";

interface Props {
  displayedStats: Stats;
  rank: number;
  color: string;
}

export default (props: Props) => {
  const returnFormatted = `${(props.displayedStats.stats.returnRate * 100).toFixed(2)}%   `;
  return (
    <TableRow sx={{ backgroundColor: props.color }}>
      <TableCell>
        <Typography variant="h6">{props.rank}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6">{props.displayedStats.company.symbol}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6">{props.displayedStats.stats.profit.toFixed(2)}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6">{returnFormatted}</Typography>
      </TableCell>
    </TableRow>
  );
};
