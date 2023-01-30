import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { advancedParams, GenericParams } from "../States/optionComp";
import ConfirmParams from "./ConfirmParams";

interface Props {
  addAdvancedParams: (params: advancedParams) => void;
  addGenericParams: (params: GenericParams) => void;
  genericParams: GenericParams;
  reRoute: (route: string, params: advancedParams | GenericParams) => void;
}

export default (props: Props) => {
  const [retThreshold, setRetThreshold] = useState<number>(0);
  const onChangeRet = (event: React.ChangeEvent<HTMLInputElement>) => setRetThreshold(Number(event.target.value));
  return (
    <Grid container item direction="column" alignItems="center">
      <Grid item>
        <TextField
          variant="outlined"
          label="Return threshold"
          onChange={onChangeRet}
          type="number"
          value={retThreshold}
        />
      </Grid>
      <Grid item>
        <ConfirmParams
          addAdvancedParams={props.addAdvancedParams}
          advancedParams={{ retThreshold: retThreshold }}
          genericParams={props.genericParams}
          addGenericParams={props.addGenericParams}
          reRoute={props.reRoute}
          strategy="maxRet"
        />
      </Grid>
    </Grid>
  );
};
