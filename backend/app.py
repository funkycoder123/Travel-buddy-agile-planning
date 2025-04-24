import datetime
import googlemaps
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
from flask_cors import CORS
import requests  # Allows frontend to interact with backend

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


# AI-Generated Itinerary Feature, GIRI.


def get_search_results(query):
    search_url = "https://www.googleapis.com/customsearch/v1"
    api_key = "AIzaSyBsTGKPn9G9y5N5I98S6m-mpHcp7ID_YYA"  # real key
    cx = "77515ca6503e74ac1"  # CSE ID
    params = {"q": query, "key": api_key, "cx": cx}
    response = requests.get(search_url, params=params)
    if response.status_code == 200:
        return [
            item["title"] + " - " + item["link"]
            for item in response.json().get("items", [])
        ]
    return []


def get_travel_suggestions(city):
    return {
        "Destinations": get_search_results(f"Best places to visit in {city}"),
        "Flights": get_search_results(f"Best flight deals to {city}"),
        "Hotels": get_search_results(f"Best hotels in {city}"),
    }


def generate_travel_packages(suggestions, budget):
    tier = "Budget" if budget < 500 else "Standard" if budget <= 1500 else "Luxury"
    return [
        {
            "Package Tier": tier,
            "Destination": (
                suggestions["Destinations"][i]
                if i < len(suggestions["Destinations"])
                else "N/A"
            ),
            "Flight": (
                suggestions["Flights"][i] if i < len(suggestions["Flights"]) else "N/A"
            ),
            "Hotel": (
                suggestions["Hotels"][i] if i < len(suggestions["Hotels"]) else "N/A"
            ),
            "Estimated Total Cost": f"${max(200, budget - i * 75)}",
        }
        for i in range(3)
    ]


def get_cheapest_travel_time(city):
    return {
        "Paris": "February",
        "Tokyo": "January",
        "New York": "March",
        "Bangkok": "September",
    }.get(city, "November")


@app.route("/api/travel", methods=["POST"])
def travel_plan():
    data = request.get_json()
    city = data.get("city")
    budget = int(data.get("budget", 0))

    if not city or budget <= 0:
        return jsonify({"message": "City and valid budget are required."}), 400

    suggestions = get_travel_suggestions(city)
    packages = generate_travel_packages(suggestions, budget)
    cheapest_time = get_cheapest_travel_time(city)

    return jsonify({"packages": packages, "cheapest_time": cheapest_time}), 200


# google maps carterball..

gmaps = googlemaps.Client(key="AIzaSyBsTGKPn9G9y5N5I98S6m-mpHcp7ID_YYA")


@app.route("/api/directions", methods=["GET"])
def get_directions():
    origin = request.args.get("origin")
    destination = request.args.get("destination")

    if not origin or not destination:
        return jsonify({"message": "Both origin and destination are required"}), 400

    direction_result = gmaps.directions(origin, destination, mode="driving")
    if direction_result:
        leg = direction_result[0]["legs"][0]
        return (
            jsonify(
                {
                    "distance": leg["distance"]["text"],
                    "duration": leg["duration"]["text"],
                    "start_address": leg["start_address"],
                    "end_address": leg["end_address"],
                }
            ),
            200,
        )
    else:
        return jsonify({"message": "No directions found"}), 404


# Run the Flask App
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
