import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Configure Gemini API
API_KEY = os.getenv("GEMINI_API_KEY", "")
if API_KEY:
    genai.configure(api_key=API_KEY)

# Define request schemas
class BrandRequest(BaseModel):
    business_name: str
    industry: str
    target_audience: str
    style: str

# Use the latest text generation model
MODEL_NAME = "gemini-1.5-flash"

@router.post("/generate-brand")
async def generate_brand(request: BrandRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is not set in backend.")
    
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        prompt = f"""
        You are an expert brand strategist. Generate branding assets for the following business:
        - Business Name: {request.business_name}
        - Industry: {request.industry}
        - Target Audience: {request.target_audience}
        - Brand Style: {request.style}

        Please provide the output in exact JSON format with the following keys:
        - "brand_names": a list of 3 potential brand names.
        - "slogan": a catchy slogan.
        - "description": a short, professional brand description (2-3 sentences).
        - "social_media_captions": a list of 3 social media captions.
        
        Output ONLY valid JSON. No markdown blocks, no prefix/suffix text.
        """
        
        response = model.generate_content(prompt)
        text_response = response.text.strip()
        
        # Robust JSON extraction
        import json
        import re
        
        # Simple search for content between first { and last }
        try:
            start_index = text_response.find('{')
            end_index = text_response.rfind('}')
            if start_index != -1 and end_index != -1 and end_index > start_index:
                json_content = text_response[start_index:end_index + 1]
                return json.loads(json_content)
        except:
            pass

        # Fallback to cleaning markdown
        if text_response.startswith('```'):
            text_response = re.sub(r'^```(?:json)?\s*', '', text_response)
            text_response = re.sub(r'\s*```$', '', text_response)
        
        return json.loads(text_response)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating content: {str(e)}")

@router.post("/generate-logo")
async def generate_logo_svg(request: BrandRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is not set in backend.")
    
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        prompt = f"""
        You are an expert graphic designer and frontend developer.
        Create a gorgeous, modern SVG logo for a business.
        - Business Name: {request.business_name}
        - Industry: {request.industry}
        - Brand Style: {request.style}
        
        Output ONLY the raw <svg> element (with its contents) with the following requirements:
        - It should have an explicit width and height (e.g., width="100%" height="100%" viewBox="0 0 400 400")
        - It should be self-contained and visually stunning.
        - Use appropriate aesthetic shapes, icons, and text styles based on the given Brand Style.
        - Do not include any HTML markdown (like ```xml or ```svg). Output only the raw XML starting with <svg> and ending with </svg>.
        """
        response = model.generate_content(prompt)
        
        svg_code = response.text.strip()
        
        # Clean up markdown if inserted
        if svg_code.startswith("```"):
            lines = svg_code.split("\n")
            # Filter out lines that start with ```
            lines = [line for line in lines if not line.startswith("```")]
            svg_code = "\n".join(lines)
            
        return {"logo_svg": svg_code}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating SVG: {str(e)}")
