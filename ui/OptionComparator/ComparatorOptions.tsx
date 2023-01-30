import React, { useEffect, useState } from "react";
import { TextField, Grid } from "@mui/material";
import { advancedParams, GenericParams, strategies } from "../States/optionComp";
import StrategyOption from "./StrategyOption";

interface Props {
  chosenCompanyMarketCap: number;
  addGenericParams: (params: GenericParams) => void;
  addStrategy: (strategy: strategies) => void;
  addAdvancedParams: (params: advancedParams) => void;
  reRoute: (route: string, params: advancedParams | GenericParams) => void;
}

export default (props: Props) => {
  const initParams: GenericParams = {
    marketCap: props.chosenCompanyMarketCap,
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
    setParamaters({ ...paramaters, marketCap: props.chosenCompanyMarketCap });
  }, [props.chosenCompanyMarketCap]);

  return (
    <Grid container item spacing={2} direction="column" alignItems="center">
      <Grid item>
        <TextField
          variant="outlined"
          label="Market Cap"
          onChange={onMarketCapChange}
          value={paramaters.marketCap}
          type="number"
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          label="Nominal Value"
          onChange={onNomValueChange}
          value={paramaters.nomValue}
          type="number"
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          label="Maturity"
          onChange={onMaturityChange}
          value={paramaters.maturity}
          type="number"
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          label="Number of Comparables"
          onChange={onNbCompsChange}
          value={paramaters.nbComparables}
          type="number"
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          label="Backtesting Length"
          onChange={onBackDate}
          value={paramaters.backTestLength}
          type="number"
        />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Tax Rate in %" onChange={onTaxChange} value={paramaters.taxRate} />
      </Grid>
      <StrategyOption
        addStrategy={props.addStrategy}
        addAdvancedParams={props.addAdvancedParams}
        genericParams={paramaters}
        addGenericParams={props.addGenericParams}
        reRoute={props.reRoute}
      />
    </Grid>
  );
};
