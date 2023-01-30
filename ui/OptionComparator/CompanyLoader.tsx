import React from "react";
import { Typography } from "@mui/material";
import useAxios from "axios-hooks";
import { useDispatch } from "react-redux";
import { addAllCompaniesInfo } from "../States/optionComp";

interface Props {
  children: JSX.Element;
}

export default (props: Props) => {
  const [{ data, loading, error }] = useAxios("/companies");
  const dispatch = useDispatch();
  if (error) {
    return <Typography>Error...</Typography>;
  }
  if (loading) {
    return <Typography>Loading</Typography>;
  }
  if (data) {
    dispatch(addAllCompaniesInfo(data));
    return <>{props.children}</>;
  }
  return <Typography>Error</Typography>;
};
