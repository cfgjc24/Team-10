import sqlite3
from enum import Enum
import datetime
import bcrypt
import datetime
import hashlib
import os

class DatabaseDriver(object):
    def create_tables(self):
        self.create_worker_table()
        # self.create_client_table()
        # self.create_boss_table()
        # self.create_location_table()
        # self.create_appointment_table()

    def __init__(self):
        self.conn = sqlite3.connect("safety.db")
        self.cursor = self.conn.cursor()
        self.create_tables()

    def create_worker_table(self):
        """
        Creates a worker table using SQL
        """
        self.conn.execute("""CREATE TABLE IF NOT EXISTS worker(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            manager INTEGER NOT NULL,
            status TEXT NOT NULL CHECK(status IN ('away', 'approaching', 'arrived')),
            last_update TIME NULL,
            check_in TIME NULL,
            check_out TIME NULL
        );""")
    
        
    def delete_worker_table(self):
        """
        Deletes a user table using SQL
        """
        self.conn.execute("""DROP TABLE IF EXISTS worker""")
    
    def get_all_workers(self):
        """
        Returns all workers in the table using SQL
        """
        cursor = self.conn.execute("""SELECT * FROM worker""")
        workers = []
        for row in cursor:
            workers.append({"id": row[0], "name": row[1], "manager": row[2], "status": row[3],"last_update": row[4], "check_in": row[5], "check_out": row[6]})
        return workers

    def get_worker_by_id(self, id):
        """
        Returns a user from the table from its id using SQL
        """
        cursor = self.conn.execute("SELECT * FROM worker WHERE id = ?;",(id,))
        for row in cursor:
            return ({"id": row[0], "name": row[1], "manager": row[2], "status": row[3],"last_update": row[4], "check_in": row[5], "check_out": row[6]})
        return None


    def insert_worker_table(self, name, manager_id):
        """
        Inserts a new worker into the worker table with default values for other fields.
        """
        time_now = datetime.datetime.now()

        cursor = self.conn.execute("""
            INSERT INTO worker (name, manager, status, last_update, check_in, check_out)
            VALUES (?, ?, ?, ?, ?, ?);
        """, (name, manager_id, 'away', time_now, None, None))
        
        self.conn.commit()
        return cursor.lastrowid

    
    def delete_worker_from_table(self, id):
        """
        Deletes a worker from the user table using SQL
        """
        self.conn.execute("DELETE FROM worker WHERE id = ?;", (id,))
        self.conn.commit()

    def update_worker_updated_time(self, id):
        curr_time = datetime.datetime.now()
        self.conn.execute("""UPDATE worker
                          SET last_updated = ?
                          WHERE id = ?;
                          """, (curr_time, id))
        self.conn.commit()


    def update_worker_status(self, id, status):
        self.conn.execute("""UPDATE worker
                          SET status = ?
                          WHERE id = ?;
                          """, (status, id))
        self.conn.commit()

    def update_check_in(self, check_in, id):
        self.conn.execute("""UPDATE worker
                          SET check_in = ?
                          WHERE id = ?;
                          """, (check_in, id))
        self.conn.commit()

    def update_check_out(self, check_out, id):
        self.conn.execute("""UPDATE worker
                          SET check_out = ?
                          WHERE id = ?;
                          """, (check_out, id))
        self.conn.commit()

