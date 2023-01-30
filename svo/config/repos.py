from functools import lru_cache
from svo.config.db import get_session_maker
from svo.repos.company import CompanyRepo
from svo.repos.prices import PricesRepo


@lru_cache
def company_get_repo():
    return CompanyRepo(get_session_maker())


@lru_cache
def prices_get_repo():
    return PricesRepo(get_session_maker())