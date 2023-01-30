import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import RowFiller from "./RowFiller";
import { StatsMaxRet } from "../../../utils/statGeneratorMaxRet";

export interface Props {
  displayedStats: ChosenStats[];
  ticker: string;
}

interface ChosenStats {
  cie: StatsMaxRet;
  rank: number;
}

export default (props: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>Rank</Typography>
          </TableCell>
          <TableCell>
            <Typography>Ticker</Typography>
          </TableCell>
          <TableCell>
            <Typography>Profit</Typography>
          </TableCell>
          <TableCell>
            <Typography>Return</Typography>
          </TableCell>
          <TableCell>
            <Typography>Option</Typography>
          </TableCell>
          <TableCell>
            <Typography>Stock</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.displayedStats.slice(0, 3).map((company) => (
          <RowFiller displayedStats={company.cie} rank={company.rank + 1} key={company.cie.company.symbol} />
        ))}
      </TableBody>
    </Table>
  );
};
