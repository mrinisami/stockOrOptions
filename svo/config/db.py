from functools import lru_cache
from svo.config.env import get_app_settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

@lru_cache
def get_session_maker():
    settings = get_app_settings()
    engine = create_engine(settings.db_url)

    return sessionmaker(bind=engine)

@lru_cache
def get_engine():
    settings = get_app_settings()
    return create_engine(settings.db_url)