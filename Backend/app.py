import json
from flask import Flask, request
import requests
# from dotenv import load_dotenv 

import db
import hashlib
import os
from datetime import datetime 

DB = db.DatabaseDriver()

app = Flask(__name__)
db_filename = "cms.db"


def success_response(data, code=200):
    """
    Formats successful response
    """
    return json.dumps(data), code


def failure_response(message, code=404):
    """
    Formats failure response
    """
    return json.dumps({"error": message}), code


# load_dotenv()
# Location_API_Key = os.getenv("IP_API_KEY")
# app = Flask(__name__)
# @app.route("/")
# def home():
#     client_ip = request.remote_addr
#     UserLat , UserLong  = proccessLocation(client_ip)
#     if (UserLat,UserLong) == (-1,-1):
#         return "Invalid IP Address -> Handle error here"
#     print(f"Users Locations Data that will be passed to DB {UserLat,UserLong}")
#     return "Hello World"

# def proccessLocation(ip:str):
#     print(f"Ip address being procces {ip}")
#     response = requests.get(f"https://ipgeolocation.abstractapi.com/v1/?api_key={Location_API_Key}&ip_address={ip}")
#     if response.status_code == 200:
#         if ip == "127.0.0.1": # so thigns dont break on local testing
#             return (-74.0792,40.731)
#         print(response.content)
#         return (response.content["longitude"], response.content["longitude"])
#     else:
#         print(f"non 200 status code: {response.status_code}")
#         print(response.content)
#         return (-1,-1)
    



# Worker Endpoints
@app.route("/worker", methods=["POST"])
def create_worker():
    """
    Preconditions: 
    - assumes id is returned from "insert_worker_table" DB function
    - assumes status, check_in and check_out can be null initially

    Endpoint for creating worker
    """
    body = json.loads(request.data)
    name = body.get("name", None)
    manager = body.get("manager", None)
    latitude = body.get("latitude", None)
    longitude = body.get("longitude", None)
    point = None

    if latitude and longitude:
        point = (longitude, latitude)
    if not name or not manager:
        error = "Boss of worker or Name of worker is missing"
        return failure_response(error)

    id = DB.worker_manager.insert_worker_table(name, manager, point)

    return success_response({"id": id})

@app.route("/worker/{id}")
def get_worker(id):
    """
    Endpoint for getting a worker by id
    """
    worker = DB.worker_manager.get_worker_by_id(id)
    if not worker:
        error = "User not found"
        return failure_response(error)
    return success_response({"worker": worker})

@app.route("/worker/{id}", methods=["DELETE"])
def delete_worker(id):
    """
    Preconditions: 
    - assumes id is given in the route
    - assumes status, check_in and check_out can be null initially

    Endpoint for deleting worker by id
    """
    user = DB.worker_manager.get_worker_by_id(id)
    if not user:
        error = "User not found"
        return failure_response(error)
    DB.worker_manager.delete_worker_from_table(id)
    return success_response({"worker": user})


@app.route("/workers")
def get_all_workers():
    """
    Endpoint for getting all workers
    """
    workers = DB.worker_manager.get_all_workers()
    return success_response({"workers": workers})


@app.route("/worker/status/{id}", methods=["POST"])
def update_worker_status(id):
    """
    Endpoint for updating worker status
    """
    body = json.loads(request.data)
    status = body.get("status", None)
    if not status:
        error = "Status missing"
        return failure_response(error)
    
    user = DB.worker_manager.get_worker_by_id(id)
    if not user:
        error = "User not found"
        return failure_response(error)
    
    DB.worker_manager.update_worker_status(status, id)
    DB.worker_manager.update_worker_updated_time(id)
    user = DB.worker_manager.get_worker_by_id(id)

    return success_response({"worker": user})


@app.route("/worker/status/{id}", methods=["POST"])
def update_worker_check_in(id):
    """
    Endpoint for updating worker check_in
    """
    body = json.loads(request.data)
    check_in = body.get("check_in", None)
    if not check_in:
        error = "Check in missing"
        return failure_response(error)
    
    user = DB.worker_manager.get_worker_by_id(id)
    if not user:
        error = "User not found"
        return failure_response(error)
    
    DB.worker_manager.update_check_in(check_in, id)
    DB.worker_manager.update_worker_updated_time(id)
    user = DB.worker_manager.get_worker_by_id(id)

    return success_response({"worker": user})








# Client Endpoints
@app.route("/client", methods=["POST"])
def create_client():
    """
    Endpoint for creating client
    """
    body = json.loads(request.data)
    name = body.get("name", None)
    desc = body.get("desc", None)
    flag_18 = body.get("flag_18", None)

    if not name:
        error = "Name of client is missing"
        return failure_response(error)

    id = DB.client_manager.insert_client_table(name, flag_18, desc)
    return success_response({"id": id})


@app.route("/client/{id}", methods=["DELETE"])
def delete_client(id):
    """
    Endpoint for deleting client by id
    """
    user = DB.client_manager.get_client_by_id(id)
    if not user:
        error = "User not found"
        return failure_response(error)
    DB.client_manager.delete_client_from_table(id)
    return success_response({"client": user})

@app.route("/clients")
def get_all_clients():
    """
    Endpoint for getting all clients
    """
    clients = DB.worker_manager.get_all_clients()
    return success_response({"clients": clients})


@app.route("/client/{id}")
def get_client(id):
    """
    Endpoint for getting a client by id
    """
    client = DB.client_manager.get_client_by_id(id)
    if not client:
        error = "User not found"
        return failure_response(error)
    return success_response({"client": client})





# Admin Endpoints
@app.route("/admin", methods=["POST"])
def create_admin():
    """
    Endpoint for creating admin
    """
    body = json.loads(request.data)
    name = body.get("name", None)

    if not name:
        error = "Name of admin is missing"
        return failure_response(error)

    id = DB.admin_manager.insert_admin_table(name)
    return success_response({"id": id})


@app.route("/admin/{id}")
def get_admin(id):
    """
    Endpoint for getting a admin by id
    """
    admin = DB.admin_manager.get_admin_by_id(id)
    if not admin:
        error = "User not found"
        return failure_response(error)
    return success_response({"admin": admin})



@app.route("/admin/{id}", methods=["DELETE"])
def delete_admin_table(id):
    """
    Endpoint for deleting admin by id
    """
    user = DB.admin_manager.get_admin_by_id(id)
    if not user:
        error = "User not found"
        return failure_response(error)
    DB.admin_manager.delete_admin_from_table(id)
    return success_response({"admin": user})


@app.route("/admins")
def get_all_admins():
    """
    Endpoint for getting all admins
    """
    admins = DB.admin_manager.get_all_admins()
    return success_response({"admin": admins})



# Location endpoints
@app.route("/location", methods=["POST"])
def create_location():
    """
    Endpoint for creating location
    """
    body = json.loads(request.data)
    latitude = body.get("latitude", None)
    longitude = body.get("longitude", None)
    location_type = body.get("location_type", None)

    if not longitude or not latitude or not location_type:
        error = "Location or location type missing"
        return failure_response(error)

    location = (longitude, latitude)
    id = DB.location_manager.insert_location(location, location_type)
    return success_response({"id": id})

@app.route("/locations")
def get_all_locations():
    """
    Endpoint for getting all locations
    """
    locations = DB.location_manager.get_all_locations()
    return success_response({"locations": locations})

@app.route("/location/{id}")
def get_location(id):
    """
    Endpoint for getting a location by id
    """
    location = DB.location_manager.get_location_by_id(id)
    if not location:
        error = "location not found"
        return failure_response(error)
    return success_response({"location": location})\
    

@app.route("/location/{id}", methods=["DELETE"])
def delete_location_table(id):
    """
    Endpoint for deleting location by id
    """
    location = DB.location_manager.get_location_by_id(id)
    if not location:
        error = "location not found"
        return failure_response(error)
    DB.location_manager.delete_location(id)
    return success_response({"location": location})




# Appointment Endpoints
@app.route("/appointment", methods=["POST"])
def create_appointment():
    """
    Endpoint for creating appointment
    """
    body = json.loads(request.data)
    client = body.get("client", None)
    worker = body.get("worker", None)
    start = body.get("start", None)
    end = body.get("end", None)
    location = body.get("location", None)

    if not worker or not client or not end or not start:
        error = "Bad request"
        return failure_response(error)

    id = DB.appointment_manager.insert_appointment(location, worker, client, start, end)
    return success_response({"id": id})


    
@app.route("/appointment/{id}")
def get_appointment(id):
    """
    Endpoint for getting a appointment by id
    """
    appointment = DB.appointment_manager.get_appointment_by_id(id)
    if not appointment:
        error = "appointment not found"
        return failure_response(error)
    return success_response({"appointment": appointment})

@app.route("/appointment")
def get_all_appointment():
    """
    Endpoint for getting all appointment
    """
    appointments = DB.appointment_manager.get_all_aappointment()
    return success_response({"appointments": appointments})

@app.route("/appointment/{id}", methods=["DELETE"])
def delete_appointment_table(id):
    """
    Endpoint for deleting appointment by id
    """
    appointment = DB.appointment_manager.get_appointment_by_id(id)
    if not appointment:
        error = "appointment not found"
        return failure_response(error)
    DB.client_manager.delete_appointment_from_table(id)
    return success_response({"appointment": appointment})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
