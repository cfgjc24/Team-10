import json
from flask import Flask, request, jsonify, render_template, redirect, url_for, session, flash
from flask_cors import CORS
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
import bcrypt
import sqlite3
from sqlite3 import Error
import requests
from dotenv import load_dotenv
import os
from datetime import datetime
import logging

import db  # Assuming this is your database module

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
Location_API_Key = os.getenv("IP_API_KEY")

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}}, supports_credentials=True)

# Configuration
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Change this to a random secret key
app.config['WTF_CSRF_ENABLED'] = False  # Disable CSRF for API usage
app.config['DATABASE'] = 'mydatabase.db'

DB = db.DatabaseDriver()

# Database functions
def get_db_connection():
    conn = None
    try:
        conn = sqlite3.connect(app.config['DATABASE'])
        conn.row_factory = sqlite3.Row
    except Error as e:
        logger.error(f"Database connection error: {e}")
    return conn

def init_db():
    conn = get_db_connection()
    if conn:
        try:
            cur = conn.cursor()
            cur.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
            ''')
            conn.commit()
        except Error as e:
            logger.error(f"Database initialization error: {e}")
        finally:
            conn.close()

# Initialize the database
init_db()

# Form classes
class RegisterForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Register")

    def validate_email(self, field):
        conn = get_db_connection()
        if conn:
            try:
                cur = conn.cursor()
                cur.execute("SELECT * FROM users WHERE email=?", (field.data,))
                user = cur.fetchone()
                if user:
                    raise ValidationError('Email Already Taken')
            finally:
                conn.close()

# Helper functions
def success_response(data, code=200):
    return json.dumps(data), code

def failure_response(message, code=404):
    return json.dumps({"error": message}), code

# Routes
@app.route('/')
def index():
    return "Welcome to the API"

@app.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return '', 204
    
    logger.info(f"Received registration request: {request.data}")
    try:
        data = request.get_json()
        logger.info(f"Parsed JSON data: {data}")
    except Exception as e:
        logger.error(f"Error parsing JSON: {e}")
        return jsonify({"error": "Invalid JSON"}), 400

    form = RegisterForm(data=data, meta={'csrf': False})
    if form.validate():
        name = form.name.data
        email = form.email.data
        password = form.password.data
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        conn = get_db_connection()
        if conn:
            try:
                cur = conn.cursor()
                cur.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
                            (name, email, hashed_password))
                conn.commit()
                logger.info(f"User registered successfully: {email}")
                return jsonify({"message": "Registration successful"}), 201
            except sqlite3.IntegrityError:
                logger.warning(f"Attempt to register with existing email: {email}")
                return jsonify({"error": "Email already exists"}), 400
            except Exception as e:
                logger.error(f"Database error during registration: {e}")
                return jsonify({"error": "An error occurred during registration"}), 500
            finally:
                conn.close()
    else:
        logger.warning(f"Form validation failed: {form.errors}")
        return jsonify({"errors": form.errors}), 400

@app.route('/login', methods=['POST'])
def login():
    form = LoginForm(request.form)
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE email=?", (email,))
        user = cur.fetchone()
        conn.close()

        if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
            session['user_id'] = user['id']
            return jsonify({"message": "Logged in successfully"}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    return jsonify({"errors": form.errors}), 400

@app.route('/dashboard')
def dashboard():
    if 'user_id' in session:
        user_id = session['user_id']
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE id=?", (user_id,))
        user = cur.fetchone()
        conn.close()
        if user:
            return jsonify({"user": dict(user)}), 200
    return jsonify({"error": "Unauthorized"}), 401

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out successfully"}), 200

# Worker Endpoints
@app.route("/worker", methods=["POST"])
def create_worker():
    body = json.loads(request.data)
    name = body.get("name")
    manager = body.get("manager")
    latitude = body.get("latitude")
    longitude = body.get("longitude")
    point = None

    if latitude and longitude:
        point = (longitude, latitude)
    if not name or not manager:
        return failure_response("Boss of worker or Name of worker is missing")

    id = DB.worker_manager.insert_worker_table(name, manager, point)
    return success_response({"id": id})

@app.route("/worker/<int:id>")
def get_worker(id):
    worker = DB.worker_manager.get_worker_by_id(id)
    if not worker:
        return failure_response("User not found")
    return success_response({"worker": worker})

@app.route("/worker/<int:id>", methods=["DELETE"])
def delete_worker(id):
    user = DB.worker_manager.get_worker_by_id(id)
    if not user:
        return failure_response("User not found")
    DB.worker_manager.delete_worker_from_table(id)
    return success_response({"worker": user})

@app.route("/workers")
def get_all_workers():
    workers = DB.worker_manager.get_all_workers()
    return success_response({"workers": workers})

@app.route("/worker/status/<int:id>", methods=["POST"])
def update_worker_status(id):
    body = json.loads(request.data)
    status = body.get("status")
    if not status:
        return failure_response("Status missing")
    
    user = DB.worker_manager.get_worker_by_id(id)
    if not user:
        return failure_response("User not found")
    
    DB.worker_manager.update_worker_status(status, id)
    DB.worker_manager.update_worker_updated_time(id)
    user = DB.worker_manager.get_worker_by_id(id)
    return success_response({"worker": user})

@app.route("/worker/check_in/<int:id>", methods=["POST"])
def update_worker_check_in(id):
    body = json.loads(request.data)
    check_in = body.get("check_in")
    if not check_in:
        return failure_response("Check in missing")
    
    user = DB.worker_manager.get_worker_by_id(id)
    if not user:
        return failure_response("User not found")
    
    DB.worker_manager.update_check_in(check_in, id)
    DB.worker_manager.update_worker_updated_time(id)
    user = DB.worker_manager.get_worker_by_id(id)
    return success_response({"worker": user})

# Client Endpoints
@app.route("/client", methods=["POST"])
def create_client():
    body = json.loads(request.data)
    name = body.get("name")
    desc = body.get("desc")
    flag_18 = body.get("flag_18")

    if not name:
        return failure_response("Name of client is missing")

    id = DB.client_manager.insert_client_table(name, flag_18, desc)
    return success_response({"id": id})

@app.route("/client/<int:id>", methods=["DELETE"])
def delete_client(id):
    user = DB.client_manager.get_client_by_id(id)
    if not user:
        return failure_response("User not found")
    DB.client_manager.delete_client_from_table(id)
    return success_response({"client": user})

@app.route("/clients")
def get_all_clients():
    clients = DB.worker_manager.get_all_clients()
    return success_response({"clients": clients})

@app.route("/client/<int:id>")
def get_client(id):
    client = DB.client_manager.get_client_by_id(id)
    if not client:
        return failure_response("User not found")
    return success_response({"client": client})

# Admin Endpoints
@app.route("/admin", methods=["POST"])
def create_admin():
    body = json.loads(request.data)
    name = body.get("name")

    if not name:
        return failure_response("Name of admin is missing")

    id = DB.admin_manager.insert_admin_table(name)
    return success_response({"id": id})

@app.route("/admin/<int:id>")
def get_admin(id):
    admin = DB.admin_manager.get_admin_by_id(id)
    if not admin:
        return failure_response("User not found")
    return success_response({"admin": admin})

@app.route("/admin/<int:id>", methods=["DELETE"])
def delete_admin_table(id):
    user = DB.admin_manager.get_admin_by_id(id)
    if not user:
        return failure_response("User not found")
    DB.admin_manager.delete_admin_from_table(id)
    return success_response({"admin": user})

@app.route("/admins")
def get_all_admins():
    admins = DB.admin_manager.get_all_admins()
    return success_response({"admin": admins})

# Location endpoints
@app.route("/location", methods=["POST"])
def create_location():
    body = json.loads(request.data)
    latitude = body.get("latitude")
    longitude = body.get("longitude")
    location_type = body.get("location_type")

    if not longitude or not latitude or not location_type:
        return failure_response("Location or location type missing")

    location = (longitude, latitude)
    id = DB.location_manager.insert_location(location, location_type)
    return success_response({"id": id})

@app.route("/locations")
def get_all_locations():
    locations = DB.location_manager.get_all_locations()
    return success_response({"locations": locations})

@app.route("/location/<int:id>")
def get_location(id):
    location = DB.location_manager.get_location_by_id(id)
    if not location:
        return failure_response("location not found")
    return success_response({"location": location})

@app.route("/location/<int:id>", methods=["DELETE"])
def delete_location_table(id):
    location = DB.location_manager.get_location_by_id(id)
    if not location:
        return failure_response("location not found")
    DB.location_manager.delete_location(id)
    return success_response({"location": location})

# Appointment Endpoints
@app.route("/appointment", methods=["POST"])
def create_appointment():
    body = json.loads(request.data)
    client = body.get("client")
    worker = body.get("worker")
    start = body.get("start")
    end = body.get("end")
    location = body.get("location")

    if not worker or not client or not end or not start:
        return failure_response("Bad request")

    id = DB.appointment_manager.insert_appointment(location, worker, client, start, end)
    return success_response({"id": id})

@app.route("/appointment/<int:id>")
def get_appointment(id):
    appointment = DB.appointment_manager.get_appointment_by_id(id)
    if not appointment:
        return failure_response("appointment not found")
    return success_response({"appointment": appointment})

@app.route("/appointments")
def get_all_appointments():
    appointments = DB.appointment_manager.get_all_appointments()
    return success_response({"appointments": appointments})

@app.route("/appointment/<int:id>", methods=["DELETE"])
def delete_appointment_table(id):
    appointment = DB.appointment_manager.get_appointment_by_id(id)
    if not appointment:
        return failure_response("appointment not found")
    DB.client_manager.delete_appointment_from_table(id)
    return success_response({"appointment": appointment})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)