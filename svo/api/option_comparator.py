from fastapi import FastAPI, Depends
from svo.config.services import get_comparator
from svo.services.comparator import Comparator
from svo.services.models import ComparatorMaxRet, ComparatorData, GenericParams, MaxRetParams
from svo.config.repos import *
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"],
                   allow_headers=["*"])

@app.get("/companies")
def home():
    #a = company_get_repo().retrieve_companies_data().to_dict()
    return company_get_repo().retrieve_companies_data()


@app.post("/simple-comparator-results", response_model=ComparatorData)
def get_option_stats(params: GenericParams, comparator: Comparator=Depends(get_comparator)):
    res = comparator.naive_comparator_stats(market_cap=params.market_cap, n_cies=params.nb_comparables,
                                            back_date=params.back_test_length, maturity=params.maturity,
                                            tax_rate=params.tax_rate, nom_value=params.nom_value)

    return res


@app.post("/max-ret-comparator-results", response_model=ComparatorMaxRet)
def get_comparator_max_ret(params: MaxRetParams, comparator: Comparator=Depends(get_comparator)) -> ComparatorMaxRet:
    res = comparator.comparator_w_max_ret(market_cap=params.market_cap, n_cies=params.nb_comparables,
                                            back_date=params.back_test_length, maturity=params.maturity,
                                            tax_rate=params.tax_rate, max_ret=params.ret_threshold, nom_value=params.nom_value)
    return res

get_option_stats(GenericParams.parse_obj({
    "market_cap": 378933510144,
    "maturity": 10,
    "nb_comparables": 20,
    "back_test_length": 10,
    "tax_rate": 0,
    "nom_value": 10000
}), get_comparator())

