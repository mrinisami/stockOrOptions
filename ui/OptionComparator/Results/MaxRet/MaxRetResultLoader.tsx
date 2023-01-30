import { Container, Typography } from "@mui/material";
import useAxios from "axios-hooks";
import React from "react";
import { useParams } from "react-router-dom";
import queryString from "query-string";
import ResultsDisplay from "./ResultsDisplay";
import { CombinedParams } from "../../../States/optionComp";

export default () => {
  const params = queryString.parse(location.search, { parseNumbers: true }) as unknown;
  const ticker = useParams<{ ticker: string }>().ticker;
  const [{ data, error, loading }] = useAxios({
    url: "/max-ret-comparator-results",
    data: params,
    method: "POST"
  });
  if (error) {
    return <Typography>Error...</Typography>;
  }
  if (loading) {
    return <Typography>Loading</Typography>;
  }
  if (data) {
    return (
      <Container>
        <ResultsDisplay ticker={ticker} params={params as CombinedParams} results={data} />
      </Container>
    );
  }
  return <Typography>Error</Typography>;
};
