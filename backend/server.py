from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

QUOTE_API_URL = "https://zenquotes.io/api/quotes"

@app.route("/get-quote", methods=["GET"])
def get_quote():
    try:
        response = requests.get(QUOTE_API_URL)
        if response.status_code == 200:
            quotes = response.json()
            return jsonify(quotes)  # Send the quotes as JSON response
        else:
            return jsonify({"error": "Failed to fetch quotes"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Run the Flask server on port 5000
