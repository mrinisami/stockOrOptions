from functools import lru_cache
from svo.config.repos import prices_get_repo
from svo.services.comparator import Comparator


@lru_cache
def get_comparator():
    return Comparator(prices_get_repo())

