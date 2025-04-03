import datetime
import requests

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
from flask_cors import CORS  # Allows frontend to interact with backend

# initialize Flask app
app = Flask(__name__)

# Configure Database (Using SQLite for simplicity)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "travelbuddy"  # Change to a strong secret....

# initialize Extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)  # Enable Cross-Origin Resource Sharing


# user model (name matches our class diagram)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)


# Initialize the database
with app.app_context():
    db.create_all()


# Root Route (Home Page)
@app.route("/")
def home():
    return "Travel Buddy App is Running! 👌"


# Register Route (User Signup)
@app.route("/register", methods=["POST"])
def register():
    # handles user registration
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # check if user already exists.
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    # hash password and store user
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# Login Route
@app.route("/login", methods=["POST"])
def login():
    # handles user login
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(
            identity=str(user.id), expires_delta=datetime.timedelta(hours=1)
        )
        return jsonify({"access_token": access_token, "name": user.name}), 200

    return jsonify({"message": "Invalid credentials"}), 401


# Protected Route (Requires JWT)
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = str(get_jwt_identity())  # Convert identity to string
    return jsonify({"message": f"Welcome User {current_user}"}), 200




#search function to get travel suggestions

def get_search_results(query):
    search_url = "https://www.googleapis.com/customsearch/v1"
    api_key = "AIzaSyD-MNaGL32BFLxGUOAuwy7oyB2YvlgB1IE"  # Replace with your API key
    cx = "60e63653d06de4aee"  # Replace with your Custom Search Engine ID
    params = {"q": query, "key": api_key, "cx": cx}
    response = requests.get(search_url, params=params)
    if response.status_code == 200:
        results = response.json().get("items", [])
        return [item["title"] + " - " + item["link"] for item in results]
    return []

def get_travel_suggestions(city):
    destinations_query = f"Best places to visit in {city}"
    flights_query = f"Best flight deals to {city}"
    hotels_query = f"Best hotels in {city}"
    
    destinations = get_search_results(destinations_query)
    flights = get_search_results(flights_query)
    hotels = get_search_results(hotels_query)
    
    return {
        "Destinations": destinations,
        "Flights": flights,
        "Hotels": hotels
    }

if __name__ == "__main__":
    city = input("Enter a city name: ")
    suggestions = get_travel_suggestions(city)
    
    print("\nTravel Suggestions:")
    print("\nTop Destinations:")
    print("\n".join(suggestions["Destinations"]))
    print("\nFlight Deals:")
    print("\n".join(suggestions["Flights"]))
    print("\nHotel Recommendations:")
    print("\n".join(suggestions["Hotels"]))

# Test case
def test_get_travel_suggestions():
    test_city = "Paris"
    results = get_travel_suggestions(test_city)
    assert isinstance(results, dict), "Result should be a dictionary"
    assert "Destinations" in results, "Missing Destinations key"
    assert "Flights" in results, "Missing Flights key"
    assert "Hotels" in results, "Missing Hotels key"
    print("Test passed!")

test_get_travel_suggestions()

# Run the Flask App
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
