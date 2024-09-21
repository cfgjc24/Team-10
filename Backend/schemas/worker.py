import datetime

class WorkerManager:
    def __init__(self, conn):
        self.conn = conn

    def create_worker_table(self):
        """
        Creates a workers table using SQL
        """
        self.conn.execute("""CREATE TABLE IF NOT EXISTS workers(
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                name TEXT NOT NULL,
                                manager INTEGER NOT NULL,
                                status TEXT CHECK(status IN ('away', 'approaching', 'arrived')) NOT NULL, 
                                last_update TIMESTAMP NOT NULL,
                                check_in TIMESTAMP NULL,
                                check_out TIMESTAMP NULL,
                                location POINT NULL,
                                FOREIGN KEY(manager) REFERENCES managers(id)
                            );""")
        self.conn.commit()


    def delete_worker_table(self):
        """
        Deletes the workers table using SQL
        """
        self.conn.execute("""DROP TABLE IF EXISTS workers""")
        self.conn.commit()

    def get_all_workers(self):
        """
        Returns all workers in the table using SQL
        """
        cursor = self.conn.execute("""SELECT * FROM workers""")
        workers = []
        for row in cursor:
            workers.append({"id": row[0], "name": row[1], "manager": row[2], "status": row[3], 
                            "last_update": row[4], "check_in": row[5], "check_out": row[6], "location": row[7]})
        return workers

    def get_worker_by_id(self, worker_id):
        """
        Returns a workers by its ID
        """
        cursor = self.conn.execute("SELECT * FROM workers WHERE id = ?;", (worker_id,))
        for row in cursor:
            return {"id": row[0], "name": row[1], "manager": row[2], "status": row[3],
                    "last_update": row[4], "check_in": row[5], "check_out": row[6]}
        return None

    def insert_worker_table(self, name, manager_id, location):
        """
        Inserts a new workers into the workers table with default values.
        """
        time_now = datetime.datetime.now()
        cursor = self.conn.execute("""
            INSERT INTO workers (name, manager, status, last_update, check_in, check_out, location)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        """, (name, manager_id, 'away', time_now, None, None, location))
        
        self.conn.commit()
        return cursor.lastrowid

    def delete_worker_from_table(self, worker_id):
        """
        Deletes a workers from the workers table using SQL
        """
        self.conn.execute("DELETE FROM workers WHERE id = ?;", (worker_id,))
        self.conn.commit()

    def update_worker_updated_time(self, worker_id):
        """
        Updates the last update time of a workers.
        """
        curr_time = datetime.datetime.now()
        self.conn.execute("""
            UPDATE workers
            SET last_update = ?
            WHERE id = ?;
        """, (curr_time, worker_id))
        self.conn.commit()

    def update_worker_status(self, worker_id, status):
        """
        Updates the status of a workers.
        """
        self.conn.execute("""
            UPDATE workers
            SET status = ?
            WHERE id = ?;
        """, (status, worker_id))
        self.conn.commit()

    def update_check_in(self, worker_id, check_in_time):
        """
        Updates the check-in time of a workers.
        """
        self.conn.execute("""
            UPDATE workers
            SET check_in = ?
            WHERE id = ?;
        """, (check_in_time, worker_id))
        self.conn.commit()

    def update_check_out(self, worker_id, check_out_time):
        """
        Updates the check-out time of a workers.
        """
        self.conn.execute("""
            UPDATE workers
            SET check_out = ?
            WHERE id = ?;
        """, (check_out_time, worker_id))
        self.conn.commit()


    def update_worker_location(self, worker_id, location):
        """
        Updates the location of a worker.
        """
        self.conn.execute("""
            UPDATE workers
            SET location = ?
            WHERE id = ?;
        """, (location, worker_id))
        self.conn.commit()