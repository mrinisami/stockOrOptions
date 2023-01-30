import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CompanyInfo } from "../api/CompaniesInfos";

interface Props {
  companies: readonly CompanyInfo[];
  addChosenCompany: (company: CompanyInfo) => void;
  chosenCompany: CompanyInfo;
}

export default (props: Props) => {
  const [company, setCompany] = useState<CompanyInfo | null>(props.chosenCompany);
  const defaultProps = { options: props.companies, getOptionLabel: (option: CompanyInfo) => option.cieName };
  useEffect(() => {
    setCompany(props.chosenCompany);
  }, [props]);
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
