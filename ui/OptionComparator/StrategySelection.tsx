import { Grid, Paper } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CompanyInfo } from "../api/CompaniesInfos";
import {
  addCompanyInfo,
  advancedParams,
  GenericParams,
  MaxRetParams,
  setAdvancedParams,
  setGenericParams,
  setStrategy,
  strategies
} from "../States/optionComp";
import CompanyLoader from "./CompanyLoader";
import ComparatorOptions from "./ComparatorOptions";
import TopCompanies from "./TopCompanies";
import { Box } from "@mui/system";

export default () => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const ciesData: CompanyInfo[] = useSelector((state) => state.optionComp.allCompaniesInfo);
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
  const simpleComparatorRouteResults = (route: string, genericParams: GenericParams) => {
    navigate.push(
      `${route}/${chosenCompany.ticker}?marketCap=${genericParams.marketCap}&maturity=${genericParams.maturity}
        &nbComparables=${genericParams.nbComparables}&backTestLength=${genericParams.backTestLength}
        &taxRate=${genericParams.taxRate}&nomValue=${genericParams.nomValue}`
    );
  };
  const maxRetRoute = (route: string, genericParams: GenericParams, advancedParams: MaxRetParams) => {
    navigate.push(`${route}/${chosenCompany.ticker}?marketCap=${genericParams.marketCap}
    &maturity=${genericParams.maturity}
    &nbComparables=${genericParams.nbComparables}&backTestLength=${genericParams.backTestLength}
    &taxRate=${genericParams.taxRate}&nomValue=${genericParams.nomValue}&retThreshold=${advancedParams.retThreshold}`);
  };
  if (ciesData.length > 0) {
    return renderContent();
  }

  return <CompanyLoader>{renderContent()}</CompanyLoader>;

  function renderContent() {
    return (
      <Box sx={{ mt: 4 }}>
        <Grid container justifyContent="space-around" flexWrap="nowrap">
          <Grid item xs={3}>
            <Paper>
              <TopCompanies addChosenCompany={addCompany} companies={ciesData} />
            </Paper>
          </Grid>
          <Grid item>
            <ComparatorOptions
              chosenCompanyInfo={chosenCompany}
              addGenericParams={addGenericParams}
              addStrategy={addStrategy}
              addAdvancedParams={addAdvancedParams}
              reRoute={simpleComparatorRouteResults}
              reRouteMaxRet={maxRetRoute}
              companies={ciesData}
              addChosenCompany={addCompany}
              chosenCompany={chosenCompany}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
};
