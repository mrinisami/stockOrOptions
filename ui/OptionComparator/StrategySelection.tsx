import { Card, Grid, Paper } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CompanyInfo } from "../api/CompaniesInfos";
import {
  addCompanyInfo,
  advancedParams,
  GenericParams,
  setAdvancedParams,
  setGenericParams,
  setStrategy,
  strategies
} from "../States/optionComp";
import ChoosingCompany from "./ChoosingCompany";
import CompanyLoader from "./CompanyLoader";
import ComparatorOptions from "./ComparatorOptions";
import TopCompanies from "./TopCompanies";

export default () => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const ciesData = useSelector((state) => state.optionComp.allCompaniesInfo);
  const chosenCompany: CompanyInfo = useSelector((state) => state.optionComp.chosenCompanyInfo);

  const addCompany = (company: CompanyInfo) => {
    dispatch(addCompanyInfo(company));
  };
  const addStrategy = (strategy: strategies) => {
    dispatch(setStrategy(strategy));
  };
  const addGenericParams = (params: GenericParams) => {
    dispatch(setGenericParams(params));
  };
  const addAdvancedParams = (params: advancedParams) => {
    dispatch(setAdvancedParams(params));
  };
  const routeResults = (route: string, params: advancedParams | GenericParams) => {
    navigate.push(
      `${route}/${chosenCompany.ticker}?marketCap=${params.marketCap}&maturity=${params.maturity}
      &nbComparables=${params.nbComparables}&backTestLength=${params.backTestLength}
      &taxRate=${params.taxRate}&nomValue=${params.nomValue}`
    );
  };
  if (ciesData.length > 0) {
    return renderContent();
  }

  return <CompanyLoader>{renderContent()}</CompanyLoader>;

  function renderContent() {
    return (
      <Grid container justifyContent="space-around" sx={{ pt: 3 }} flexWrap="nowrap">
        <Grid item xs={3}>
          <Paper>
            <TopCompanies addChosenCompany={addCompany} companies={ciesData} />
          </Paper>
        </Grid>
        <Paper>
          <Grid container item direction="column" alignItems="center" rowSpacing={2}>
            <Grid item sx={{ width: "50%" }}>
              <ChoosingCompany companies={ciesData} addChosenCompany={addCompany} />
            </Grid>
            <Grid item sx={{ pb: 3 }}>
              <ComparatorOptions
                chosenCompanyMarketCap={chosenCompany.marketCap}
                addGenericParams={addGenericParams}
                addStrategy={addStrategy}
                addAdvancedParams={addAdvancedParams}
                reRoute={routeResults}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
};
