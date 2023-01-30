import React, { useState } from "react";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  Typography,
  Grid,
  TextField,
  Button
} from "@mui/material";
import { advancedParams, GenericParams, strategies } from "../States/optionComp";
import MaxRetParams from "./MaxRetParams";
import SellWRet from "./SellWRet";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { routes } from "../routes";

interface Props {
  addStrategy: (strategy: strategies) => void;
  addAdvancedParams: (params: advancedParams) => void;
  addGenericParams: (params: GenericParams) => void;
  genericParams: GenericParams;
  reRoute: (route: string, params: advancedParams | GenericParams) => void;
}

export default (props: Props) => {
  const [strategy, setStrategy] = useState("simple");
  const onChangeStrategy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrategy((event.target as HTMLInputElement).value);
  };

  function displayAdvancedParams() {
    const onClickSubmitParams = () => {
      props.addGenericParams(props.genericParams);
      props.reRoute(routes.simpleResults, props.genericParams);
    };
    if (strategy === "maxRet") {
      return (
        <MaxRetParams
          addAdvancedParams={props.addAdvancedParams}
          genericParams={props.genericParams}
          addGenericParams={props.addGenericParams}
          reRoute={props.reRoute}
        />
      );
    } else if (strategy === "sellWRet")
      return (
        <SellWRet
          addAdvancedParams={props.addAdvancedParams}
          genericParams={props.genericParams}
          addGenericParams={props.addGenericParams}
          reRoute={props.reRoute}
        />
      );
    else
      return (
        <Grid item>
          <Button endIcon={<ArrowCircleRightOutlinedIcon />} onClick={onClickSubmitParams}>
            <Typography>View Results</Typography>
          </Button>
        </Grid>
      );
  }
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <FormControl>
          <FormLabel>
            <Typography>Strategies</Typography>
          </FormLabel>
          <RadioGroup value={strategy} onChange={onChangeStrategy} row>
            <FormControlLabel value="simple" control={<Radio />} label="Simple" />
            <FormControlLabel value="maxRet" control={<Radio />} label="Max return condition" />
            <FormControlLabel value="sellWRet" control={<Radio />} label="Early sales" />
          </RadioGroup>
        </FormControl>
      </Grid>
      {displayAdvancedParams()}
    </Grid>
  );
};
