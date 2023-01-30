import { Switch, Route } from "react-router-dom";
import { routes } from "../routes";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../Store/store";
import StrategySelection from "../OptionComparator/StrategySelection";
import MaxRetResultLoader from "../OptionComparator/Results/MaxRet/MaxRetResultLoader";
import Home from "../Home/Home";
import ResultsPage from "../OptionComparator/Results/SimpleResults/ResultsPage";

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route exact path={routes.topCompanies} component={StrategySelection} />
          <Route exact path={`${routes.simpleResults}/:ticker`} component={ResultsPage} />
          <Route exact path={routes.maxRetResults} component={MaxRetResultLoader} />
        </Switch>
      </Provider>
    </>
  );
};
