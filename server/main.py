from fastapi import FastAPI, UploadFile, File
from typing import Any, Dict
from PIL import Image
import easyocr
import pytesseract


import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

origins = [
    "http://localhost:5173",  # Origen permitido
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

def predict_incidence(model, cases):
    # Make a prediction based on the provided number of cases
    predicted_incidence = model.predict([[cases]])
    return predicted_incidence[0]

@app.post("/predict_complication")
async def predict_complication():
    file_path = './data/complications.xlsx'

    # Read the Excel file into a pandas DataFrame
    df = pd.read_excel(file_path)

    # Display the first few rows of the DataFrame
    print(df.head())

    # Basic statistics of the numeric columns
    print(df.describe())

    # Check for missing values
    print(df.isnull().sum())

    # Let's do some basic analysis
    # For example, let's find the average number of cases for each complication
    average_cases = df.groupby('Complicaciones')['Numero_casos'].mean()
    print(average_cases)

    # Now, let's split the data into features and target variable
    X = df[['Numero_casos']].values  # Features
    y = df['incidencia'].values      # Target variable

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Now let's train a linear regression model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Make predictions on the test set
    y_pred = model.predict(X_test)

    # Evaluate the model using mean squared error
    mse = mean_squared_error(y_test, y_pred)
    print("Mean Squared Error:", mse)


    average_cases = df.groupby('Complicaciones')['Numero_casos'].mean()
    print(average_cases)

    # Now, let's split the data into features and target variable
    X = df[['Numero_casos']].values  # Features
    y = df['incidencia'].values      # Target variable

    # Now let's train a linear regression model
    model = LinearRegression()
    model.fit(X, y)

    # Now, let's predict incidence for each complication
    complications = df['Complicaciones'].unique()
    predictions = {}
    for complication in complications:
        total_cases_complication = df[df['Complicaciones'] == complication]['Numero_casos'].sum()
        predicted_incidence_complication = predict_incidence(model, total_cases_complication)
        predictions[complication] = predicted_incidence_complication

    print("*****************")
    print("Predicted incidences for each complication:")
    for complication, incidence in predictions.items():
        print(f"{complication}: {incidence} ")
    return {"message": "hola"}


@app.get("/amount_of_cases")
async def amount_of_cases():
    file_path = './data/cantidad_embarazos.xlsx'

    # Read the Excel file into a pandas DataFrame
    df = pd.read_excel(file_path, skiprows=range(1, 3))
    
    # Rename the cols
    df.columns = ['Departamento', 'Total', 'Cantidad']

    #Just 2 cols
    df = df[['Departamento', 'Cantidad']]

    data = df.to_dict('records')

    # clean the first 2 rows
    data = data[2:]
    print(data)

    return {"data": data}

@app.get("/age_group")
async def age_grup():
    file_path = './data/cantidad_embarazos.xlsx'

    # Read the Excel file into a pandas DataFrame
    df = pd.read_excel(file_path)

    # Rename the cols
    df.columns = ['Departamento', 'Total', 'Grupo_edades']

    #Just 2 cols
    df = df[['Grupo_edades']]

    data = df.to_dict('records')

    # just the 3 rows first
    data = data[2:3]
    
    return {"data": data}


@app.get("/first_time")
async def first_time():
    file_path = './data/first_time.xlsx'

    # Read the Excel file into a pandas DataFrame
    df = pd.read_excel(file_path)

    # Rename the cols
    df.columns = ['Rando_edad', 'Porcentaje']
    print(df)

    data = df.to_dict('records')
    
    return {"data": data}