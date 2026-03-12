from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import generators

app = FastAPI(
    title="BrandCraft AI API",
    description="Backend API for Generative Branding Automation System using Gemini API",
    version="1.0.0"
)

# Allow React frontend to communicate with Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generators.router, prefix="/api", tags=["generators"])

@app.get("/")
def root():
    return {"message": "Welcome to the BrandCraft AI System API"}
