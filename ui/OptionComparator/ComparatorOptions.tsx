import React, { useEffect, useState } from "react";
import { TextField, Grid, Paper } from "@mui/material";
import { advancedParams, GenericParams, MaxRetParams, strategies } from "../States/optionComp";
import StrategyOption from "./StrategyOption";
import { CompanyInfo } from "../api/CompaniesInfos";
import ChoosingCompany from "./ChoosingCompany";

interface Props {
  chosenCompanyInfo: CompanyInfo;
  addGenericParams: (params: GenericParams) => void;
  addStrategy: (strategy: strategies) => void;
  addAdvancedParams: (params: advancedParams) => void;
  reRoute: (route: string, genericParams: GenericParams) => void;
  reRouteMaxRet: (route: string, genericParams: GenericParams, advancedParams: MaxRetParams) => void;
  companies: readonly CompanyInfo[];
  addChosenCompany: (company: CompanyInfo) => void;
  chosenCompany: CompanyInfo;
}

export default (props: Props) => {
  const initParams: GenericParams = {
    marketCap: props.chosenCompanyInfo.marketCap,
    maturity: 10,
    nbComparables: 20,
    backTestLength: 10,
    taxRate: 0,
    nomValue: 10000
  };
  const [paramaters, setParamaters] = useState<GenericParams>(initParams);
  const onMarketCapChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setParamaters({ ...paramaters, marketCap: Math.floor(Number(event.target.value)) });
  const onMaturityChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setParamaters({ ...paramaters, maturity: Math.floor(Number(event.target.value)) });
  const onNbCompsChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setParamaters({ ...paramaters, nbComparables: Math.floor(Number(event.target.value)) });
  const onBackDate = (event: React.ChangeEvent<HTMLInputElement>) =>
    setParamaters({ ...paramaters, backTestLength: Math.floor(Number(event.target.value)) });
  const onTaxChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setParamaters({ ...paramaters, taxRate: Number(event.target.value) });
  const onNomValueChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setParamaters({ ...paramaters, nomValue: Number(event.target.value) });
  useEffect(() => {
    setParamaters({ ...paramaters, marketCap: props.chosenCompanyInfo.marketCap });
  }, [props.chosenCompanyInfo.marketCap]);

  return (
    <Paper elevation={18} sx={{ py: 2 }}>
      <Grid container item justifyContent="center">
        <Grid item container direction="column" xs={6} rowSpacing={3}>
          <Grid item>
            <ChoosingCompany
              companies={props.companies}
              addChosenCompany={props.addChosenCompany}
              chosenCompany={props.chosenCompany}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="Market Cap"
              onChange={onMarketCapChange}
              value={paramaters.marketCap}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="Nominal Value"
              onChange={onNomValueChange}
              value={paramaters.nomValue}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="Maturity"
              onChange={onMaturityChange}
              value={paramaters.maturity}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="Number of Comparables"
              onChange={onNbCompsChange}
              value={paramaters.nbComparables}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="Backtesting Length"
              onChange={onBackDate}
              value={paramaters.backTestLength}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="Tax Rate in %"
              onChange={onTaxChange}
              value={paramaters.taxRate}
              fullWidth
            />
          </Grid>
        </Grid>
        <StrategyOption
          addStrategy={props.addStrategy}
          addAdvancedParams={props.addAdvancedParams}
          genericParams={paramaters}
          addGenericParams={props.addGenericParams}
          reRoute={props.reRoute}
          chosenCompany={props.chosenCompanyInfo}
          reRouteMaxRet={props.reRouteMaxRet}
        />
      </Grid>
    </Paper>
  );
};
