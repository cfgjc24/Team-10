from flask_sqlalchemy import SQLAlchemy
import bcrypt
import datetime
import hashlib
import os

db = SQLAlchemy()

association_table = db.Table(
    "association",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("user.id")),
    db.Column("course_id", db.Integer, db.ForeignKey("course.id")),
)


# your classes here
class User(db.Model):
    """
    User Model
    """

    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)
    password_digest = db.Column(db.String, nullable=False)
    timers = db.relationship("Timer", cascade="delete")
    courses = db.relationship(
        "Course", secondary=association_table, back_populates="users"
    )

    session_token = db.Column(db.String, nullable=False, unique=False)
    session_expiration = db.Column(db.DateTime, nullable=False, unique=False)
    update_token = db.Column(db.String, nullable=False, unique=True)

    def __init__(self, **kwargs):
        """
        Initialize User Entry
        """
        self.name = kwargs.get("name")
        self.password_digest = bcrypt.hashpw(
            kwargs.get("password_digest").encode("utf8"), bcrypt.gensalt(rounds=13)
        )
        self.renew_session()

    def simple_serialize(self):
        """
        Serialize User object without courses or timers
        """
        return {"id": self.id, "name": self.name}

    def session_serialize(self):
        return {
            "session_token": self.session_token,
            "session_expiration": self.session_expiration.timestamp(),
            "update_token": self.update_token,
        }

    def serialize(self):
        """
        Serialize User object
        """
        return {
            **self.simple_serialize(),
            "courses": [c.user_data_serialize() for c in self.courses],
            "timers": [t.simple_serialize() for t in self.timers],
        }

    def serialize_with_session(self):
        """
        Serialize User object with session data
        """
        return {"session": self.session_serialize(), "user": self.serialize()}

    def _urlsafe_base_64(self):
        return hashlib.sha1(os.urandom(64)).hexdigest()

    def renew_session(self):
        self.session_token = self._urlsafe_base_64()
        self.update_token = self._urlsafe_base_64()
        self.session_expiration = datetime.datetime.now() + datetime.timedelta(days=1)

    def verify_password(self, password):
        return bcrypt.checkpw(password.encode("utf8"), self.password_digest)

    def verify_session_token(self, session_token):
        return (
            session_token == self.session_token
            and datetime.datetime.now() < self.session_expiration
        )

    def verify_update_token(self, update_token):
        return update_token == self.update_token


class Course(db.Model):
    """
    Course Model
    """

    __tablename__ = "course"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    code = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    assignments = db.relationship("Assignment", cascade="delete")
    users = db.relationship(
        "User", secondary=association_table, back_populates="courses"
    )

    def __init__(self, **kwargs):
        """
        Initialize Course Object
        """
        self.name = kwargs.get("name")
        self.code = kwargs.get("code")
        self.description = kwargs.get("description")

    def simple_serialize(self):
        """
        Serialize Course without assignments or users
        """
        return {
            "id": self.id,
            "name": self.name,
            "code": self.code,
            "description": self.description,
        }

    def user_data_serialize(self):
        """
        Serialize Course with assignments
        """
        return {
            **self.simple_serialize(),
            "assignments": [a.simple_serialize() for a in self.assignments],
        }

    def serialize(self):
        """
        Serialize Course
        """
        return {
            **self.user_data_serialize(),
            "users": [u.simple_serialize() for u in self.users],
        }


class Assignment(db.Model):
    """
    Assignment Model
    """

    __tablename__ = "assignment"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    due_date = db.Column(db.Integer, nullable=False)
    done = db.Column(db.Boolean, nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("course.id"), nullable=False)
    course = db.relationship("Course", foreign_keys="Assignment.course_id")

    def __init__(self, **kwargs):
        """
        Initialize Assignment Object
        """
        self.name = kwargs.get("name")
        self.description = kwargs.get("description")
        self.due_date = kwargs.get("due_date")
        self.done = kwargs.get("done")
        self.course_id = kwargs.get("course_id")

    def simple_serialize(self):
        """
        Serialize Assignment without course
        """
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "due_date": self.due_date,
            "done": self.done,
            "course_id": self.course_id,
        }

    def serialize(self):
        """
        Serialize Assignment
        """
        return {**self.simple_serialize()}


class Timer(db.Model):
    """
    Timer Model
    """

    __tablename__ = "timer"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    elapsed_time = db.Column(db.Integer, nullable=False)
    hours = db.Column(db.Integer, nullable=False)
    minutes = db.Column(db.Integer, nullable=False)
    seconds = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user = db.relationship("User", foreign_keys="Timer.user_id")

    def __init__(self, **kwargs):
        """
        Initialize Assignment Object
        """
        self.elapsed_time = kwargs.get("elapsed_time")
        self.hours = kwargs.get("hours")
        self.minutes = kwargs.get("minutes")
        self.seconds = kwargs.get("seconds")
        self.date = kwargs.get("date")
        self.user_id = kwargs.get("user_id")

    def simple_serialize(self):
        """
        Serialize Assignment without course
        """
        return {
            "id": self.id,
            "elapsed_time": self.elapsed_time,
            "hours": self.hours,
            "minutes": self.minutes,
            "seconds": self.seconds,
            "date": self.date,
        }

    def serialize(self):
        """
        Serialize Assignment
        """
        return {**self.simple_serialize(), "user": self.user.simple_serialize()}
