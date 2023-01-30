import { Grid, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from "@mui/material";
import React, { useState } from "react";
import { CompaniesInfo, CompanyInfo } from "../api/CompaniesInfos";
import RowFiller from "./RowFiller";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useDispatch, useSelector } from "react-redux";
import CompanyLoader from "./CompanyLoader";
import { render } from "react-dom";
import { addCompanyInfo } from "../States/optionComp";

interface Props {
  companies: CompaniesInfo;
  addChosenCompany: (company: CompanyInfo) => void;
}

export default (props: Props) => {
  const [increment, setIncrement] = useState(5);

  const onClickAddRow = () => setIncrement(increment + 5);
  const onClickRemoveRow = () => setIncrement(increment - 5);
  return (
    <Grid container item direction="column">
      <Grid item>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Ticker
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Market Cap
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Start Date
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.companies.slice(0, increment).map((cie: CompanyInfo) => (
              <RowFiller company={cie} addChosenCompany={props.addChosenCompany} key={cie.cieName} />
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid container item justifyContent="flex-end">
        <Grid item>
          <IconButton onClick={onClickRemoveRow} color="primary">
            <ExpandLessIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={onClickAddRow} color="primary">
            <ExpandMoreIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
