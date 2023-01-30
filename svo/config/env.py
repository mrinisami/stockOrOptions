from pydantic import BaseSettings
from functools import lru_cache


class AppSettings(BaseSettings):
    db_url: str
    cors_origins: str

@lru_cache
def get_app_settings():
    return AppSettings()
