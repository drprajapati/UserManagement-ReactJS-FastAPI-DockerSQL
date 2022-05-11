from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine("mysql+pymysql://root:password@localhost:50027/test", echo=True)
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)
