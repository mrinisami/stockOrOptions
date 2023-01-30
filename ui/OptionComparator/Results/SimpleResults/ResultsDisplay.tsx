import { Grid, Paper, Typography, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import { ComparatorData } from "../../../api/Results";
import { GenericParams } from "../../../States/optionComp";
import { topPerformerStat, topPerformerStatYearly } from "../../../utils/statGenerator";
import AggregateStats from "../AggregateStats";
import Graph from "./Graph";
import TopWinners from "./TopWinners";
import YearSelection from "./YearSelection";

interface Props {
  results: ComparatorData;
  genericParams: GenericParams;
  ticker: string;
}

export default (props: Props) => {
  const [tabValue, setTabValue] = useState<"aggregate" | "yearly">("aggregate");
  const [year, setYear] = useState<number>(props.results.companies[0].years[0].year);
  const results = props.results;
  const genericParams = props.genericParams;
  const ticker = props.ticker;
  const years = results.companies[0].years.map((year) => year.year);
  const optionStats =
    tabValue === "aggregate"
      ? topPerformerStat(results.companies, genericParams.nomValue, genericParams.backTestLength, "option")
      : topPerformerStatYearly(results.companies, "option", year);
  const sortedOptionStats = optionStats
    .sort((a, b) => b.stats.profit - a.stats.profit)
    .map((company, i) => {
      return { cie: company, rank: i };
    });
  const stockStats =
    tabValue === "aggregate"
      ? topPerformerStat(results.companies, genericParams.nomValue, genericParams.backTestLength, "stock")
      : topPerformerStatYearly(results.companies, "stock", year);
  const sortedStockStats = stockStats
    .sort((a, b) => b.stats.profit - a.stats.profit)
    .map((company, i) => {
      return { cie: company, rank: i };
    });
  const handleChange = (event: React.SyntheticEvent, newValue: "aggregate" | "yearly") => {
    setTabValue(newValue);
  };
  const onClickYear = (newYear: number) => {
    setYear(newYear);
  };
  return (
    <Grid container direction="column">
      <Grid item alignSelf="center">
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="Aggregate" value="aggregate"></Tab>
          <Tab label="Yearly" value="yearly"></Tab>
        </Tabs>
      </Grid>
      <Grid item container direction="column" rowSpacing={3} sx={{ pt: 6, pb: 3 }}>
        {tabValue === "yearly" ? <YearSelection onClickYear={onClickYear} years={years} /> : <></>}
        <Paper elevation={18}>
          <Grid item container justifyContent="space-evenly">
            <Grid item sx={{ borderBottom: "groove", borderRadius: "1rem" }} xs={3}>
              <Typography variant="h4" align="center">
                Option
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{ borderBottom: "groove", borderRadius: "1rem" }}>
              <Typography variant="h4" align="center">
                Stat
              </Typography>
            </Grid>
            <Grid item sx={{ borderBottom: "groove", borderRadius: "1rem" }} xs={3}>
              <Typography variant="h4" align="center">
                Stock
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <AggregateStats
              companiesStats={results}
              genericParams={genericParams}
              isYearly={tabValue === "yearly" ? true : false}
              chosenYear={year}
            />
          </Grid>
        </Paper>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="h4" align="center">
              TOP PERFORMERS
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-evenly" alignItems="center">
            <Grid item xs={5} sx={{ borderBottom: "groove", borderRadius: "1rem" }}>
              <Typography variant="h4" align="center">
                Option
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{ borderBottom: "groove", borderRadius: "1rem" }}>
              <Typography variant="h4" align="center">
                Stock
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent="space-evenly">
            <Grid item xs={5}>
              <Paper elevation={18}>
                <TopWinners displayedStats={sortedOptionStats} ticker={ticker} />
              </Paper>
            </Grid>
            <Grid item xs={5}>
              <Paper elevation={18}>
                <TopWinners displayedStats={sortedStockStats} ticker={ticker} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="h4" align="center">
              WORST PERFORMERS
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-evenly">
            <Grid item xs={5} sx={{ borderBottom: "groove", borderRadius: "1rem" }}>
              <Typography variant="h4" align="center">
                Option
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{ borderBottom: "groove", borderRadius: "1rem" }}>
              <Typography variant="h4" align="center">
                Stock
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent="space-evenly">
            <Grid item xs={5}>
              <Paper elevation={18}>
                <TopWinners displayedStats={[...sortedOptionStats].reverse()} ticker={ticker} />
              </Paper>
            </Grid>
            <Grid item xs={5}>
              <Paper elevation={18}>
                <TopWinners displayedStats={[...sortedStockStats].reverse()} ticker={ticker} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Paper elevation={18}>
            <Graph optionStats={optionStats} stockStats={stockStats} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
