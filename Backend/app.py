import json
import datetime

from db import Assignment, User, Course, Timer, db
from sqlalchemy import func
from sqlalchemy.sql import text
from flask import Flask, request

app = Flask(__name__)
db_filename = "cms.db"

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///%s" % db_filename
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

db.init_app(app)
with app.app_context():
    db.create_all()


def extract_token(request):
    auth_header = request.headers.get("Authorization")
    if auth_header is None:
        return False, failure_response("Missing authorization header")
    bearer_token = auth_header.replace("Bearer ", "").strip()
    if not bearer_token:
        return False, failure_response("Missing authorization header")
    return True, bearer_token


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
@app.route("/")
@app.route("/api/courses/")
def get_courses():
    """
    Endpoint for getting all courses
    """
    return success_response({"courses": [c.serialize() for c in Course.query.all()]})


@app.route("/api/course/", methods=["POST"])
def create_course():
    """
    Endpoint for creating a new course
    """
    success, response = extract_token(request)
    if not success:
        return response
    session_token = response

    user = User.query.filter_by(session_token=session_token).first()
    if not user or not user.verify_session_token(session_token):
        return failure_response("Invalid session token")

    body = json.loads(request.data)
    code = body.get("code", None)
    name = body.get("name", None)
    description = body.get("description", None)

    error = ""

    if code is None:
        error += "Missing code in request body. "

    if name is None:
        error += "Missing name in request body. "
    if description is None:
        error += "Missing description in request body. "

    error = error.strip()

    if error != "":
        return failure_response(error, 400)

    new_course = Course(code=code, name=name, description=description)
    new_course.users.append(user)
    db.session.add(new_course)
    db.session.commit()
    return success_response(new_course.serialize(), 201)


@app.route("/api/course/<int:course_id>/")
def get_course(course_id):
    """
    Endpoint for getting specific course
    """
    course = Course.query.filter_by(id=course_id).first()
    if course is None:
        return failure_response("Course not found")
    return success_response(course.serialize())


@app.route("/api/courses/<int:user_id>/")
def user_courses(user_id):
    """
    Endpoint for getting all a users courses
    """
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = User.query.filter_by(id=user_id).first()
    if not user.verify_session_token(session_token):
        return failure_response("Invalid session token")
    if user is None:
        return failure_response("User not found")
    return success_response({"courses": user.serialize().get("courses")})


@app.route("/api/course/<course_id>/", methods=["POST"])
def change_course(course_id):
    """
    Endpoint for changing a course name and/or code
    """
    success, session_token = extract_token(request)
    if not success:
        return session_token

    user = User.query.filter_by(session_token=session_token).first()
    if user is None or not user.verify_session_token(session_token):
        return failure_response("Invalid session token")

    body = json.loads(request.data)
    name = body.get("name")
    code = body.get("code")
    description = body.get("description", None)

    course = Course.query.filter_by(id=course_id).first()

    if course == None:
        return failure_response("Course not found")
    if name == None and code == None and description == None:
        return failure_response("Bad request")
    if name != None:
        course.name = name
    if code != None:
        course.code = code
    if description != None:
        course.description = description

    db.session.commit()
    return success_response(course.serialize())


@app.route("/api/course/<int:course_id>/", methods=["DELETE"])
def delete_course(course_id):
    """
    Endpoint for deleting course
    """
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = User.query.filter_by(session_token=session_token).first()
    if user is None or not user.verify_session_token(session_token):
        return failure_response("Invalid session token")

    course = Course.query.filter_by(id=course_id).first()
    if course is None:
        return failure_response("Course not found")
    db.session.delete(course)
    db.session.commit()
    return success_response(course.serialize())


@app.route("/api/users/", methods=["POST"])
def create_user():
    """
    Endpoint for creating a new user
    """
    body = json.loads(request.data)
    name = body.get("name", None)
    password = body.get("password", None)
    error = ""

    if name is None or password is None:
        error += "Missing name or password in request body. "

    error = error.strip()

    if error != "":
        return failure_response(error, 400)

    new_user = User(name=name, password_digest=password)
    db.session.add(new_user)
    db.session.commit()
    return success_response(new_user.serialize(), 201)


@app.route("/api/users/<int:user_id>/")
def get_user(user_id):
    """
    Endpoint for getting specific user by id
    """
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return failure_response("User not found")
    return success_response(user.serialize())


@app.route("/api/users/")
def get_update_user():
    """
    Endpoint for getting updated user by session
    """
    success, response = extract_token(request)
    if not success:
        return response
    session_token = response

    user = User.query.filter_by(session_token=session_token).first()

    if not user or not user.verify_session_token(session_token):
        return failure_response("Invalid Session Token")

    if user is None:
        return failure_response("User not found")
    position = get_leader_board_position(user)
    return success_response({**user.serialize_with_session(), **position})


@app.route("/api/users/login/", methods=["POST"])
def login():
    """
    Endpoint to verify user's login credentials
    """
    body = json.loads(request.data)
    name = body.get("name", None)
    password = body.get("password", None)
    if name is None or password is None:
        error += "Missing name or password in request body. "
    user = User.query.filter_by(name=name).first()
    if user is None:
        return failure_response("Username and/or password is incorrect.")
    user_valid = user.verify_password(password)

    if user_valid == False:
        return failure_response("Username and/or password is incorrect.")

    user.renew_session()
    db.session.commit()
    position = get_leader_board_position(user)

    return success_response({**user.serialize_with_session(), **position})


def get_leader_board_position(user):
    leader_board = [l.user_id for l in get_leader_board("all")]

    if user.id in leader_board:
        return {"position": leader_board.index(user.id) + 1}

    else:
        return {"position": len(leader_board) + 1}


@app.route("/logout/", methods=["POST"])
def logout():
    success, response = extract_token(request)
    if not success:
        return response
    session_token = response

    user = User.query.filter_by(session_token=session_token).first()

    if not user or not user.verify_session_token(session_token):
        return failure_response("Invalid Session Token")
    user.session_expiration = datetime.dateTime.now()
    db.session.commit()
    return success_response("Logged Out")


@app.route("/api/assignment/<int:assignment_id>/", methods=["DELETE"])
def delete_assignment(assignment_id):
    """
    Endpoint for deleting course
    """
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = User.query.filter_by(session_token=session_token).first()
    if user is None or not user.verify_session_token(session_token):
        return failure_response("Invalid session token")

    assignment = Assignment.query.filter_by(id=assignment_id).first()
    if assignment is None:
        return failure_response("assignment not found")
    db.session.delete(assignment)
    db.session.commit()
    return success_response(assignment.serialize())


@app.route("/api/assignment/<assignment_id>/", methods=["POST"])
def change_assignment(assignment_id):
    """
    Endpoint for changing a course name and/or code
    """
    success, session_token = extract_token(request)
    if not success:
        return session_token

    user = User.query.filter_by(session_token=session_token).first()
    if user is None or not user.verify_session_token(session_token):
        return failure_response("Invalid session token")

    body = json.loads(request.data)
    name = body.get("name")
    due_date = body.get("due_date")
    description = body.get("description")
    done = body.get("done")

    assignment = Assignment.query.filter_by(id=assignment_id).first()

    if assignment == None:
        return failure_response("Course not found")
    if name == None and due_date == None and description == None and done == None:
        return failure_response("Bad request")
    if name != None:
        assignment.name = name
    if due_date != None:
        assignment.due_date = due_date
    if description != None:
        assignment.description = description
    if done != None:
        assignment.done = done

    db.session.commit()
    return success_response(assignment.serialize())


@app.route("/api/courses/<int:course_id>/assignment/", methods=["POST"])
def add_assignment_to_course(course_id):
    success, response = extract_token(request)
    if not success:
        return response
    session_token = response

    user = User.query.filter_by(session_token=session_token).first()
    if not user or not user.verify_session_token(session_token):
        return failure_response("Invalid session token")

    body = json.loads(request.data)
    name = body.get("name", None)
    description = body.get("description", None)
    due_date = body.get("due_date", None)
    done = body.get("done", None)

    error = ""

    if name is None:
        error += "Missing name in request body. "

    if description is None:
        error += "Missing description in request body. "

    if due_date is None:
        error += "Missing due_date in request body. "

    if done is None:
        error += "Missing done in request body. "

    error = error.strip()

    if error != "":
        return failure_response(error, 400)

    course = Course.query.filter_by(id=course_id).first()
    if course is None:
        return failure_response("Course not found")

    assignment = Assignment(
        name=name,
        description=description,
        due_date=due_date,
        done=done,
        course_id=course_id,
    )
    db.session.add(assignment)
    db.session.commit()

    return success_response(assignment.serialize(), 201)


@app.route("/api/timer/", methods=["POST"])
def add_timer_to_user():
    success, response = extract_token(request)
    if not success:
        return response
    session_token = response

    user = User.query.filter_by(session_token=session_token).first()
    if not user or not user.verify_session_token(session_token):
        return failure_response("Invalid session token")

    body = json.loads(request.data)
    elapsed_time = body.get("elapsed_time", None)
    hours = body.get("hours", None)
    minutes = body.get("minutes", None)
    seconds = body.get("seconds", None)
    date = body.get("date", None)

    error = ""

    if elapsed_time is None:
        error += "Missing elapsed_time in request body. "
    if hours is None:
        error += "Missing hours in request body. "
    if minutes is None:
        error += "Missing minutes in request body. "
    if seconds is None:
        error += "Missing seconds in request body. "
    if date is None:
        error += "Missing date in request body. "

    error = error.strip()

    if error != "":
        return failure_response(error, 400)

    user = User.query.filter_by(id=user.id).first()
    if user is None:
        return failure_response("User not found")

    timer = Timer(
        elapsed_time=elapsed_time,
        hours=hours,
        minutes=minutes,
        seconds=seconds,
        date=date,
        user_id=user.id,
    )
    db.session.add(timer)
    db.session.commit()

    return success_response(timer.serialize(), 201)


@app.route("/api/timer/")
def get_timers():
    """
    Endpoint for getting timers from specific user
    """
    success, response = extract_token(request)
    if not success:
        return response
    session_token = response

    user = User.query.filter_by(session_token=session_token).first()
    if not user or not user.verify_session_token(session_token):
        return failure_response("Invalid session token")

    timers = Timer.query.filter_by(user_id=user.id).all()
    if timers is None:
        return failure_response("User not found")
    return success_response([t.serialize() for t in timers])


@app.route("/api/timer/leader_board/<time_span>/")
def retrieve_leader_board(time_span):
    """
    Endpoint for work time leader board
    """
    if (
        time_span != "all"
        and time_span != "day"
        and time_span != "week"
        and time_span != "month"
        and time_span != "year"
    ):
        return failure_response(
            f"The time_span must be all, day, week, month, or year not {time_span}",
            code=400,
        )

    leader_board = get_leader_board(time_span)

    if leader_board is None:
        return failure_response("No timers found")
    return success_response(
        [{"user_id": l.user_id, "total": l.total} for l in leader_board]
    )


@app.route("/api/timer/leader_board/<time_span>/<int:user_id>/")
def retrieve_leader_board_position(time_span, user_id):
    """
    Endpoint for user's position in work time leader board
    """
    success, response = extract_token(request)
    if not success:
        return response
    session_token = response

    user = User.query.filter_by(session_token=session_token).first()
    if not user or not user.verify_session_token(session_token):
        return failure_response("Invalid session token")

    if (
        time_span != "all"
        and time_span != "day"
        and time_span != "week"
        and time_span != "month"
        and time_span != "year"
    ):
        return failure_response(
            f"The time_span must be all, day, week, month, or year not {time_span}",
            code=400,
        )

    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return failure_response("User not found")

    return success_response(get_leader_board_position())


def get_leader_board(time_span):
    """
    Helper function for getting work time leader board
    """
    query = db.session.query(Timer.user_id, func.sum(Timer.elapsed_time).label("total"))

    leader_board = []
    if time_span == "all":
        leader_board = query.group_by(Timer.user_id).order_by(text("total DESC")).all()
    else:
        min_date = datetime.datetime.now().timestamp()
        if time_span == "day":
            min_date -= 60 * 60 * 24
        elif time_span == "week":
            min_date -= 60 * 60 * 24 * 7
        elif time_span == "month":
            min_date -= 60 * 60 * 24 * 31
        elif time_span == "year":
            min_date -= 60 * 60 * 24 * 365
        leader_board = (
            query.filter(Timer.date >= min_date)
            .group_by(Timer.user_id)
            .order_by(text("total DESC"))
            .all()
        )

    return leader_board


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
