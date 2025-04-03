import datetime
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

# Map/Direction Route

# Imports for Google Maps API
import googlemaps
from flask import Flask, jsonify, request
gmaps = googlemaps.Client(key="YOUR_GOOGLE_MAPS_API_KEY")

@app.route("/directions", methods=["GET"])
def get_directions():
    origin = request.args.get('origin')  # Get origin from query params
    destination = request.args.get('destination') #Get destination from query params

    # Checking if origin and destination where entered correctly
    if not origin or not destination:
        return jsonify({"message": "Both origin and destination are required"}), 400
    
    # Getting directions from Google maps API
    direction_result = gmaps.directions(origin, destination, mode="driving")

    # Setting variables for distance and duration and filling it with trip data
    if direction_result: 
        leg = direction_result[0]['legs'][0]
        duration = leg['duration']['text']
        distance = leg['distance']['text']
        return jsonify({
            "duration": duration,
            "distance": distance,
            "directions": direction_result[0]  # Send full directions data (optional)
        }), 200
    # Directions were not found
    else:
        return jsonify({"message": "No Directions Found!"}), 400


# Protected Route (Requires JWT)
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = str(get_jwt_identity())  # Convert identity to string
    return jsonify({"message": f"Welcome User {current_user}"}), 200


# Run the Flask App
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
