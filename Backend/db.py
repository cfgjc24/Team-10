# database_driver.py

import sqlite3
from worker import WorkerManager  # Import WorkerManager
import datetime
import bcrypt
import hashlib
import os

class DatabaseDriver(object):
    def create_tables(self):
        self.worker_manager.create_worker_table()
        self.create_client_table()
        self.create_boss_table()
        self.create_location_table()
        self.create_appointment_table()

    def __init__(self):
        self.conn = sqlite3.connect("safety.db")
        self.cursor = self.conn.cursor()
        self.worker_manager = WorkerManager(self.conn)
        self.create_tables()


