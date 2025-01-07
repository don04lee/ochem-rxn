from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()


class ReactionHistory(Base):
    __tablename__ = "reaction_history"

    id = Column(Integer, primary_key=True, index=True)
    reactants = Column(String, nullable=False)
    product = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcoffset)
