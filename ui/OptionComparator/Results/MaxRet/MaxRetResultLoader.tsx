import { Typography } from "@mui/material";
import useAxios from "axios-hooks";
import { produceWithPatches } from "immer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComparatorResults, GenericParams, MaxRetParams } from "../../../States/optionComp";

interface Props {
  children: JSX.Element;
}

export default (props: Props) => {
  const advancedParams: MaxRetParams = useSelector((state) => state.optionComp.advancedParams);
  const genericParams: GenericParams = useSelector((state) => state.optionComp.genericParams);
  const dispatch = useDispatch();
  const combinedParams = { ...advancedParams, ...genericParams };
  const [{ data, error, loading }] = useAxios({
    url: "/profit-using-max-ret-comparator",
    data: combinedParams,
    method: "POST"
  });
  if (error) {
    return <Typography>Error...</Typography>;
  }
  if (loading) {
    return <Typography>Loading</Typography>;
  }
  if (data) {
    dispatch(addComparatorResults(data));
    return <>{props.children}</>;
  }
  return <Typography>Error</Typography>;
};
