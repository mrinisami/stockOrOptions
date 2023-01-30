import React from "react";
import { Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, Typography } from "@mui/material";

interface Props {
  onClickYear: (year: number) => void;
  years: number[];
}

export default (props: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onClickYear(Number((event.target as HTMLInputElement).value));
  };
  return (
    <FormControl>
      <FormLabel>
        <Typography>Year</Typography>
      </FormLabel>
      <RadioGroup row onChange={handleChange}>
        {props.years.map((year) => (
          <FormControlLabel value={year} control={<Radio />} label={year} key={year} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
