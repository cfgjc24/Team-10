import sqlite3
from schemas import worker  
from schemas import client
from schemas import admin

class DatabaseDriver(object):
    def create_tables(self):
        self.worker_manager.create_worker_table()
        self.client_manager.create_client_table()
        self.admin_manager.create_admin_table()
        self.create_client_table()
        self.create_boss_table()
        self.create_location_table()
        self.create_appointment_table()

    def __init__(self):
        self.conn = sqlite3.connect("safety.db")
        self.cursor = self.conn.cursor()
        self.worker_manager = WorkerManager(self.conn)
        self.client_manager = ClientManager(self.conn)
        self.admin_manager = AdminManager(self.conn)
        self.create_tables()


