from sqlalchemy import Column, Integer, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Scheme(Base):
    __tablename__ = "schemes"

    SchemeID = Column(Integer, primary_key=True, index=True)
    Title = Column(Text, nullable=False)
    Description = Column(Text)
    Eligibility = Column(Text)
    Benefits = Column(Text)
