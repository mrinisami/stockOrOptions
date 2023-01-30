import { createSlice } from "@reduxjs/toolkit";
import { CompaniesInfo, CompanyInfo } from "../api/CompaniesInfos";
import { ComparatorData, ComparatorDataMaxRet } from "../api/Results";

export interface OptionState {
  chosenCompanyInfo: CompanyInfo;
  chosenStrategy: strategies;
  allCompaniesInfo: CompanyInfo[];
  genericParams: GenericParams;
  advancedParams: advancedParams;
  results: ComparatorData | ComparatorDataMaxRet;
}

export type strategies = "simple" | "maxRet" | "sellWRet";

export interface GenericParams {
  marketCap: number;
  maturity: number;
  nbComparables: number;
  backTestLength: number;
  taxRate: number;
  nomValue: number;
}
export interface CombinedParams extends GenericParams {
  retThreshold: number;
}
export type advancedParams = MaxRetParams | SellWRetParams;

export interface MaxRetParams {
  retThreshold: number;
}

export interface SellWRetParams {
  retThreshold: number;
  vestingPeriod: number;
  percentageVested: number;
}

const initialState: OptionState = {
  chosenCompanyInfo: { cieName: "", marketCap: 0, ticker: "", startDate: "" },
  chosenStrategy: "simple",
  allCompaniesInfo: [],
  genericParams: { marketCap: 0, maturity: 10, nbComparables: 20, backTestLength: 10, taxRate: 0, nomValue: 10000 },
  advancedParams: { retThreshold: 0 },
  results: { companies: [] }
};

const compSlice = createSlice({
  name: "optionComp",
  initialState: initialState,
  reducers: {
    addAllCompaniesInfo: (state, action) => {
      state.allCompaniesInfo = action.payload;
    },
    addCompanyInfo: (state, action) => {
      state.chosenCompanyInfo = action.payload;
    },
    setStrategy: (state, action) => {
      state.chosenStrategy = action.payload;
    },
    setGenericParams: (state, action) => {
      state.genericParams = action.payload;
    },
    setAdvancedParams: (state, action) => {
      state.advancedParams = action.payload;
    },
    addComparatorResults: (state, action) => {
      state.results = action.payload;
    }
  }
});

export const {
  addCompanyInfo,
  addAllCompaniesInfo,
  setStrategy,
  setAdvancedParams,
  setGenericParams,
  addComparatorResults
} = compSlice.actions;
export default compSlice.reducer;
