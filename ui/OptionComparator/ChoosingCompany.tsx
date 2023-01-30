import { Grid, Autocomplete, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import { CompaniesInfo, CompanyInfo } from "../api/CompaniesInfos";

interface Props {
  companies: readonly CompanyInfo[];
  addChosenCompany: (company: CompanyInfo) => void;
}

export default (props: Props) => {
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const defaultProps = { options: props.companies, getOptionLabel: (option: CompanyInfo) => option.cieName };
  return (
    <Autocomplete
      {...defaultProps}
      value={company}
      onChange={(_, newCompany: CompanyInfo | null) => {
        if (newCompany) {
          props.addChosenCompany(newCompany);
        }
        setCompany(newCompany);
      }}
      id="company-select"
      options={props.companies}
      renderInput={(params) => <TextField {...params} label="Companies" />}
      fullWidth={true}
      sx={{ width: "100%" }}
    />
  );
};
