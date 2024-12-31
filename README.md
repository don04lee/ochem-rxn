# Organic Chemistry Reaction Predictor

by Dong Woo Lee

This is a full-stack project meant to combine my interests in Computer Science and Biochemistry by making an organic chemistry reaction predictor that predicts the organic chemistry reaction using pre-trained models from [OpenChem](https://github.com/Mariewelt/OpenChem/tree/master).

## Plan

### Input

Input is for now taken in by SMILES notation with solvent, temperature, and other environmental variables involved.
Input in the form of drawings similar to ChemDraw or WebMO will be explored in the future.

### Output

Output will be displayed both in SMILES notation and [RDKit](https://github.com/rdkit/rdkit).
Not entirely sure what these visualizations will look like, so will have to do a decent amount of exploration.

### Saving Reaction History

This will be done through [PostGreSQL](https://github.com/postgres/postgres).

### AI Model

The hosting of the AI model by [OpenChem](https://github.com/Mariewelt/OpenChem/tree/master) will be hosted under AWS SageMaker.

### Deployment

Deployment of the backend will be done under AWS EC2 for FastAPI. Deployment of the frontend will be done by AWS S3.
All of the development will be done under a Docker image for consistency between development (and just to test how Docker works).

### Stack

Frontend: React; When drawing-based inputs are integrated with mechanisms shown, React Flow and ChemDoodle Web Components will be attempted to be included.
Backend: Python with FastAPI and RDKit for molecule processing.
ML: PyTorch with RDKit for the representations.

## Resources

Korshunova, Maria, et al. "OpenChem: A Deep Learning Toolkit for Computational Chemistry and Drug Design." Journal of Chemical Information and Modeling 61.1 (2021): 7-13.
