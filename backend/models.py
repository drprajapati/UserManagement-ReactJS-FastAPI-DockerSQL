from pydantic import BaseModel
from database import Base
from sqlalchemy import String, Boolean, Integer, Column, Text


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
