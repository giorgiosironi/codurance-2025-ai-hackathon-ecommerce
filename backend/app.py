from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the CSV file
CSV_PATH = os.path.join(os.path.dirname(__file__), 'styles.csv')

@app.route('/')
def hello_world():
    return jsonify({"message": "Welcome to StyleDen API"})

@app.route('/products')
def get_products():
    # Read the CSV file, skipping the header row
    df = pd.read_csv(CSV_PATH, nrows=20)
    
    # Convert the DataFrame to a list of dictionaries
    products = df.to_dict('records')
    
    return jsonify({"items": products})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 
