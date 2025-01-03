from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()


class ReactionInput(BaseModel):
    """
    The properties that are taken for input in the reaction:
    1) reactants
    2) solvent
    3) temperature
    4) pressure  (optional)
    """

    reactants: str  # SMILES notation
    solvent: str
    temperature: float
    pressure: None  # optional


# Fast API handles JSON serialization and deserialization
@app.get("/")
def read_root():
    return {"message": "Welcome to the Organic Reaction Predictor API :)"}


@app.post("/predict")
async def predict_reaction(reaction: ReactionInput):
    """
    User can send a POST request with JSON body that is as:
    {
      "reactants": "CCO",
      "solvent": "water",
      "temperature": 25.0,
    }
    """
    return {"message": "Prediction received", "input": reaction}


@app.get("/predict/{reaction_id}")
async def get_prediction(
    reaction_id: int,
):  # Current placeholder; replace with database/ML model
    if reaction_id == 1:
        return {
            "reaction_id": reaction_id,
            "reactants": "CCO",
            "product": "COOH",
            "mechanism": "Sn1",
        }
    raise HTTPException(status_code=404, detail="Reaction not found")


# API requests relating to the reaction history


@app.post("/history")
async def save_history(reaction: ReactionInput):
    # Placeholder, save to PostgreSQL
    return {"message": "Reaction saved to history", "reaction": reaction}


@app.get("/history")
async def get_history():
    # Placeholder, get from PostgreSQL
    return [
        {"id": 1, "reactants": "CCO", "product": "COOH", "mechanism": "Sn1"},
        {"id": 2, "reactants": "CCC", "product": "C=C", "mechanism": "E2"},
    ]
