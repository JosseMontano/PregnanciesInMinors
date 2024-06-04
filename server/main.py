from fastapi import FastAPI, UploadFile, File
import pandas as pd
from typing import Any, Dict
import base64
from PIL import Image
import io
import easyocr
import pytesseract

app = FastAPI()

@app.get("/convert_excel_to_json")
async def convert_excel_to_json() -> Dict[str, Any]:
    # Load the Excel file
    df = pd.read_excel('mujeres1.xlsx')

    # Convert the data to JSON
    json_data = df.to_json(orient='records')
    # Write the JSON data to a file
    with open('mujeres1.json', 'w') as json_file:
        json_file.write(json_data)

    return {"message": "Excel file has been successfully converted to JSON"}


@app.post("/convert_image_to_json")
async def convert_image_to_json(file: UploadFile = File(...)) -> Dict[str, Any]:
    reader = easyocr.Reader(['en'])
    result = reader.readtext('img1.jpg', detail = 0)
    return {"text": result}


@app.post("/convert_image_to_json2")
async def convert_image_to_json(file: UploadFile = File(...)) -> Dict[str, Any]:
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    result = pytesseract.image_to_string('img1.jpg')
    result = result.split('\n')  # Split the text at each newline
    return {"text": result}