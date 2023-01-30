import React from "react";
import { useSelector } from "react-redux";
import { CompanyInfo } from "../../../api/CompaniesInfos";
import { ComparatorData } from "../../../api/Results";
import { GenericParams } from "../../../States/optionComp";
import ResultsDisplay from "./ResultsDisplay";
import SimpleResultLoader from "./ResultsPage";
import queryString from "query-string";
import { Container } from "@mui/material";

export default () => {
  const params = queryString.parse(location.search, { parseNumbers: true });
  const results: ComparatorData = useSelector((state) => state.optionComp.results);
  const genericParams: GenericParams = useSelector((state) => state.optionComp.genericParams);
  const chosenCompanyInfo: CompanyInfo = useSelector((state) => state.optionComp.chosenCompanyInfo);
  console.log(results.companies.length);
  if (results.companies.length > 0) {
    return renderContent();
  }

  return <SimpleResultLoader params={params}>{renderContent()}</SimpleResultLoader>;

  function renderContent() {
    return (
      <Container>
        <ResultsDisplay results={results} genericParams={genericParams} ticker={chosenCompanyInfo.ticker} />
      </Container>
    );
  }
};
