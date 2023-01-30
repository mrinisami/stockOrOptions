import { Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { ComparatorDataMaxRet } from "../../../api/Results";
import { CombinedParams } from "../../../States/optionComp";
import { topPerformerStat, topPerformerStatYearly } from "../../../utils/statGeneratorMaxRet";
import YearSelection from "../SimpleResults/YearSelection";
import PerformanceTable from "./PerformanceTable";

interface Props {
  ticker: string;
  params: CombinedParams;
  results: ComparatorDataMaxRet;
}

export default (props: Props) => {
  const [tabValue, setTabValue] = useState<"aggregate" | "yearly">("aggregate");
  const years = props.results.companies[0].years.map((year) => year.year);
  const [year, setYear] = useState<number>(years[0]);
  const handleChange = (event: React.SyntheticEvent, newValue: "aggregate" | "yearly") => {
    setTabValue(newValue);
  };
  const stats =
    tabValue === "aggregate"
      ? topPerformerStat(props.results.companies, props.params.nomValue, props.params.backTestLength)
      : topPerformerStatYearly(props.results.companies, year);
  const onClickYear = (newYear: number) => {
    setYear(newYear);
  };
  const rankedStats = stats
    .sort((a, b) => b.stats.profit - a.stats.profit)
    .map((company, i) => {
      return { cie: company, rank: i };
    });
  return (
    <Grid container direction="column">
      <Grid item alignSelf="center">
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="Aggregate" value="aggregate"></Tab>
          <Tab label="Yearly" value="yearly"></Tab>
        </Tabs>
      </Grid>
      <Grid item alignSelf="center">
        {tabValue === "yearly" ? <YearSelection years={years} onClickYear={onClickYear} /> : <></>}
      </Grid>
      <Grid item>
        <Typography variant="h4" align="center">
          TOP PERFORMERS
        </Typography>
      </Grid>
      <Grid item>
        <Paper elevation={18}>
          <PerformanceTable displayedStats={rankedStats} ticker={props.ticker} />
        </Paper>
      </Grid>
    </Grid>
  );
};
