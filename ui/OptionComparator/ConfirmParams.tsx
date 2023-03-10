import { Button, Typography } from "@mui/material";
import React from "react";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { advancedParams, GenericParams, MaxRetParams, strategies } from "../States/optionComp";
import { routes } from "../routes";

interface Props {
  addAdvancedParams: (params: advancedParams) => void;
  addGenericParams: (params: GenericParams) => void;
  advancedParams: advancedParams;
  genericParams: GenericParams;
  reRouteMaxRet: (route: string, genericParams: GenericParams, advancedParams: MaxRetParams) => void;
  strategy: strategies;
}

export default (props: Props) => {
  const onClickSubmitParams = () => {
    props.addAdvancedParams(props.advancedParams);
    props.addGenericParams(props.genericParams);
    if (props.strategy === "maxRet") {
      props.reRouteMaxRet(routes.maxRetResults, props.genericParams, props.advancedParams);
    }
  };
  return (
    <Button endIcon={<ArrowCircleRightOutlinedIcon />} onClick={onClickSubmitParams}>
      <Typography>View Results</Typography>
    </Button>
  );
};
