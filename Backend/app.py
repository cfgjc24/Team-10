import json
from flask import Flask, request
import db
import hashlib
import os
from datetime import datetime 

DB = db.DatabaseDriver()

app = Flask(__name__)
db_filename = "cms.db"

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///%s" % db_filename
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config["SQLALCHEMY_ECHO"] = True

# db.init_app(app)
# with app.app_context():
#     db.create_all()

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


# your routes here
@app.route("/")


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

    if not name or not manager:
        error = "Boss of worker or Name of worker is missing"
        return failure_response(error)

    id = DB.insert_worker_table(name, manager)

    return success_response({"id": id})

@app.route("/worker/{id}", methods=["DELETE"])
def delete_worker(id):
    """
    Preconditions: 
    - assumes id is given in the route
    - assumes status, check_in and check_out can be null initially

    Endpoint for deleting worker by id
    """
    user = DB.get_worker(id)
    if not user:
        error = "User not found"
        return failure_response(error)
    DB.delete_worker_from_table(id)
    return success_response({"user": user})


@app.route("/workers")
def get_all_workers():
    workers = DB.get_all_workers()
    return success_response({"workers": workers})

# @app.route("/u")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
