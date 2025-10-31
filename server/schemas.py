from pydantic import BaseModel

class SchemeBase(BaseModel):
    Title: str
    Description: str
    Eligibility: str
    Benefits: str

class SchemeCreate(SchemeBase):
    pass

class SchemeResponse(SchemeBase):
    SchemeID: int

    class Config:
        from_attributes = True

