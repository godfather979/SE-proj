from fastapi import FastAPI, Depends, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db import get_db
from models import Scheme
from schemas import SchemeCreate, SchemeResponse

app = FastAPI(title="Schemes API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def root():
    return {"message": "Schemes API running successfully!"}

@app.get("/search_schemes", response_model=list[SchemeResponse])
def search_schemes(db: Session = Depends(get_db)):
    try:
        schemes = db.query(Scheme).all()
        return schemes
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    
@app.get("/view_schemes", response_model=list[SchemeResponse])
def search_schemes(db: Session = Depends(get_db)):
    try:
        schemes = db.query(Scheme).all()
        return schemes
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# ➕ Route: Add new scheme
@app.post("/manage_scheme", response_model=SchemeResponse)
def manage_scheme(scheme: SchemeCreate, db: Session = Depends(get_db)):
    try:
        new_scheme = Scheme(
            Title=scheme.Title,
            Description=scheme.Description,
            Eligibility=scheme.Eligibility,
            Benefits=scheme.Benefits
        )
        db.add(new_scheme)
        db.commit()
        db.refresh(new_scheme)
        return new_scheme
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")


    
@app.delete("/manage_scheme/{scheme_id}", response_model=dict)
def delete_scheme(
    scheme_id: int = Path(..., description="The ID of the scheme to delete"),
    db: Session = Depends(get_db),
):
    try:
        scheme = db.query(Scheme).filter(Scheme.SchemeID == scheme_id).first()
        if not scheme:
            raise HTTPException(status_code=404, detail="Scheme not found")

        db.delete(scheme)
        db.commit()
        return {"message": f"Scheme with ID {scheme_id} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")