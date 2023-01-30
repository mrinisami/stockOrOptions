import { Chip, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ComparatorData } from "../../api/Results";
import { GenericParams } from "../../States/optionComp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { aggregateStats, aggregateStatsYearly } from "../../utils/statGenerator";

interface Props {
  companiesStats: ComparatorData;
  genericParams: GenericParams;
  isYearly: boolean;
  chosenYear: number;
}

export default (props: Props) => {
  const [bmkRet, setbmkRet] = useState<number>(20);
  const stats = props.isYearly
    ? aggregateStatsYearly(props.companiesStats.companies, bmkRet / 100, props.chosenYear)
    : aggregateStats(props.companiesStats.companies, bmkRet / 100);
  const onChangeBmk = (event: React.ChangeEvent<HTMLInputElement>) => setbmkRet(Number(event.target.value));

  return (
    <Grid item container direction="column" alignItems="center">
      {displayResults(Number(stats.optionProfit.toFixed(2)), Number(stats.stockProfit.toFixed(2)), "AVERAGE PROFIT")}

      {displayResults(stats.optionNbWins, stats.stockNbWins, "YEARS WON")}

      {displayResults(stats.optionNbOfRetOverBmk, stats.stockNbOfRetOverBmk, "RETURN ABOVE BENCHMARK")}
      <Grid item>
        <TextField variant="outlined" label="Benchmark return" value={bmkRet} onChange={onChangeBmk} />
      </Grid>
    </Grid>
  );
  function displayResults(option: number, stock: number, stat: string) {
    return (
      <Grid item container justifyContent="space-evenly">
        <Grid item xs={3}>
          <Chip label={option} sx={{ fontSize: "1.5rem" }} icon={option > stock ? <EmojiEventsIcon /> : <></>} />
        </Grid>
        <Grid item xs={3}>
          <Typography>{stat}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Chip label={stock} sx={{ fontSize: "1.5rem" }} icon={option < stock ? <EmojiEventsIcon /> : <></>} />
        </Grid>
      </Grid>
    );
  }
};
