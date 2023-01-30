import { Grid, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import React, { useState } from "react";
import { CompaniesInfo, CompanyInfo } from "../api/CompaniesInfos";

interface RowProps {
  company: CompanyInfo;
  addChosenCompany: (company: CompanyInfo) => void;
}

export default (props: RowProps) => {
  const onClickChosenCompany = () => {
    props.addChosenCompany(props.company);
  };
  return (
    <TableRow sx={{ cursor: "pointer" }} onClick={onClickChosenCompany}>
      <TableCell>
        <Typography>{props.company.ticker}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.company.cieName}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.company.marketCap}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.company.startDate}</Typography>
      </TableCell>
    </TableRow>
  );
};
