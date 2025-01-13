from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import os
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import SessionLocal, get_db, init_db
from backend.models import Base, ReactionHistory
from rxn4chemistry import RXN4ChemistryWrapper
from backend.init_db import init_db

# Must set RXN_API_KEY as environment variable to make RXN4Chemistry work
api_key = os.getenv("RXN_API_KEY")
if not api_key:
    raise ValueError("Missing API Key! Set RXN_API_KEY as an environment variable.")
else:
    print(f"RXN_API_KEY is set:  {api_key[:5]}...")

PROJECT_NAME = "ochem-rxn-predictor"  # Edit this to what project name you would like

rxn = RXN4ChemistryWrapper(api_key)
rxn.create_project(PROJECT_NAME)
rxn.set_project(rxn.project_id)
print(f"The project ID is {rxn.project_id} with name {PROJECT_NAME}")

init_db()
print("Database has been initialized.")

app = FastAPI(title="Organic Chemistry Reaction Predictor API")


@app.on_event("startup")
async def startup():
    await init_db()


class ReactionInput(BaseModel):
    """
    The properties that are taken for input in the reaction:
    1) reactants
    2) solvent
    EXAMPLE: BrBr.c1ccc2cc3ccccc3cc2c1
    """

    reactants: (
        str  # SMILES notation, all solvents should be included in the SMILES notation
    )


class ReactionComplete(BaseModel):
    """
    Contains both the reactants and product within the reaction
    """

    reactants: str  # SMILES notation, at least two reactants
    product: str  # SMILES notation


# Fast API handles JSON serialization and deserialization
@app.get("/")
def read_root():
    """
    Welcome to the Organic Reaction Predictor API, which takes input from the user in SMILES notation (for now) and
    calls the IBM RXN for Chemistry API to predict the product.
    """
    return {"message": "Welcome to the Organic Reaction Predictor API :)"}


@app.post("/predict")
async def predict_reaction(reaction: ReactionInput):
    """
    User can send a POST request with JSON body that is as:
    {
      "reactants": "BrBr.c1ccc2cc3ccccc3cc2c1",
    }
    - Where reactants should be in SMILES notation
    - There must be at least two reactants to predict the product
    """
    try:
        # Submit the reaction prediction request
        pred_response = rxn.predict_reaction(reaction.reactants)
        pred_id = pred_response.get("prediction_id")

        if not pred_id:
            raise HTTPException(
                status_code=500, detail="Failed to retrieve prediction ID."
            )

        # Polling until result is SUCCESS
        while True:
            result = rxn.get_predict_reaction_results(pred_id)
            if result["response"]["payload"]["status"] == "SUCCESS":
                break

        # Extract predicted product and confidence
        attempts = result["response"]["payload"]["attempts"]

        if not attempts:
            raise HTTPException(status_code=501, detail="No prediction results found.")

        pred_product = attempts[0]["smiles"]
        confidence = attempts[0].get("confidence", "Unknown")

        return {
            "message": "Reaction prediction successful!",
            "reactants": reaction.reactants,
            "predicted_product": pred_product,
            "confidence": confidence,
        }

    except Exception as e:
        raise HTTPException(
            status_code=501, detail=f"Error predicting reaction: {str(e)}"
        )


# API requests relating to the reaction history through PostgreSQL


@app.post("/history")
async def save_history(reaction: ReactionComplete, db: AsyncSession = Depends(get_db)):
    new_reaction = ReactionHistory(
        reactants=reaction.reactants, product=reaction.product
    )
    db.add(new_reaction)
    await db.commit()
    await db.refresh(new_reaction)
    return {"message": "Reaction saved", "reaction_id": new_reaction.id}


@app.get("/history")
async def get_history(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ReactionHistory))
    reactions = result.scalars().all()
    return reactions
