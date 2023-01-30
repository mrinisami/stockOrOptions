import React from "react";
import { Grid, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

export default () => {
  const navigate = useHistory();
  return (
    <Grid container>
      <Button onClick={() => navigate.push("/top-companies")}>Top Companies</Button>
    </Grid>
  );
};
