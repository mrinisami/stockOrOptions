import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { advancedParams, GenericParams, MaxRetParams, SellWRetParams } from "../States/optionComp";
import ConfirmParams from "./ConfirmParams";

interface Props {
  addAdvancedParams: (params: advancedParams) => void;
  addGenericParams: (params: GenericParams) => void;
  genericParams: GenericParams;
  reRouteMaxRet: (route: string, genericParams: GenericParams, advancedParams: MaxRetParams) => void;
}

export default (props: Props) => {
  const initParams: SellWRetParams = { retThreshold: 0, vestingPeriod: 0, percentageVested: 0 };
  const [parameters, setParamaters] = useState<SellWRetParams>(initParams);
  const onChangeRet = (event: React.ChangeEvent<HTMLInputElement>) =>
    setParamaters({ ...parameters, retThreshold: Number(event.target.value) });
  const onChangeVestPeriod = (event: React.ChangeEvent<HTMLInputElement>) =>
    setParamaters({ ...parameters, vestingPeriod: Number(event.target.value) });
  const onChangePercVested = (event: React.ChangeEvent<HTMLInputElement>) =>
    setParamaters({ ...parameters, percentageVested: Number(event.target.value) });
  return (
    <Grid container item direction="column" alignItems="center">
      <Grid item container justifyContent="space-evenly">
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            label="Return threshold"
            onChange={onChangeRet}
            type="number"
            value={parameters.retThreshold}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            label="Vesting period"
            type="number"
            onChange={onChangeVestPeriod}
            value={parameters.vestingPeriod}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            label="Percentage vested"
            type="number"
            onChange={onChangePercVested}
            value={parameters.percentageVested}
          />
        </Grid>
      </Grid>
      <Grid item>
        <ConfirmParams
          addAdvancedParams={props.addAdvancedParams}
          advancedParams={parameters}
          genericParams={props.genericParams}
          addGenericParams={props.addGenericParams}
          reRoute={props.reRoute}
          strategy="sellWRet"
        />
      </Grid>
    </Grid>
  );
};
