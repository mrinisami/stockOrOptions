import React, { useState } from "react";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  Button
} from "@mui/material";
import { advancedParams, GenericParams, strategies, MaxRetParams } from "../States/optionComp";
import SellWRet from "./SellWRet";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { routes } from "../routes";
import { CompanyInfo } from "../api/CompaniesInfos";
import ErrorIcon from "@mui/icons-material/Error";
import MaxRet from "./MaxRetParams";

interface Props {
  addStrategy: (strategy: strategies) => void;
  addAdvancedParams: (params: advancedParams) => void;
  addGenericParams: (params: GenericParams) => void;
  genericParams: GenericParams;
  chosenCompany: CompanyInfo;
  reRoute: (route: string, genericParams: GenericParams) => void;
  reRouteMaxRet: (route: string, genericParams: GenericParams, advancedParams: MaxRetParams) => void;
}

export default (props: Props) => {
  const [strategy, setStrategy] = useState("simple");
  const onChangeStrategy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrategy((event.target as HTMLInputElement).value);
  };

  function displayAdvancedParams() {
    const [showError, setShowError] = useState<boolean>(false);
    const maxBackTestLength = Math.floor(
      (Date.now() - Date.parse(props.chosenCompany.startDate)) / (1000 * 60 * 60 * 24 * 365.25)
    );
    const onClickSubmitParams = () => {
      props.addGenericParams(props.genericParams);
      const comparableDate = Date.now() - props.genericParams.backTestLength * (1000 * 60 * 60 * 24 * 365.25);
      if (comparableDate > Date.parse(props.chosenCompany.startDate)) {
        props.reRoute(routes.simpleResults, props.genericParams);
      } else {
        setShowError(true);
      }
    };
    const handleClose = () => {
      setShowError(false);
    };
    if (strategy === "maxRet") {
      return (
        <MaxRet
          addAdvancedParams={props.addAdvancedParams}
          genericParams={props.genericParams}
          addGenericParams={props.addGenericParams}
          reRouteMaxRet={props.reRouteMaxRet}
        />
      );
    } else if (strategy === "sellWRet")
      return (
        <SellWRet
          addAdvancedParams={props.addAdvancedParams}
          genericParams={props.genericParams}
          addGenericParams={props.addGenericParams}
          reRouteMaxRet={props.reRouteMaxRet}
        />
      );
    else
      return (
        <Grid item>
          <Button endIcon={<ArrowCircleRightOutlinedIcon />} onClick={onClickSubmitParams}>
            <Typography>View Results</Typography>
          </Button>
          <Dialog open={showError} onClose={handleClose}>
            <DialogTitle>
              <Grid container>
                <Grid item>
                  <ErrorIcon />
                </Grid>
                <Grid item>
                  <Typography>Backtesting Length is longer than the company's start date</Typography>
                </Grid>
                <Grid item>
                  <Typography>Maximum backtesting length is {maxBackTestLength}</Typography>
                </Grid>
              </Grid>
            </DialogTitle>
          </Dialog>
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
