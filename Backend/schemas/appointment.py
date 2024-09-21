class AppointmentManager:
    def __init__(self, conn):
        self.conn = conn

    def create_appointment_table(self):
        """
        Creates an appointments table using SQL
        """
        self.conn.execute("""CREATE TABLE IF NOT EXISTS appointments(
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                location POINT NULL,
                                worker_id INTEGER NOT NULL,
                                client_id INTEGER NOT NULL,
                                expected_start TIMESTAMP NOT NULL,
                                expected_end TIMESTAMP NOT NULL,
                                FOREIGN KEY(worker_id) REFERENCES workers(id),
                                FOREIGN KEY(client_id) REFERENCES clients(id)
                            );""")
        self.conn.commit()

    def delete_appointment_table(self):
        """
        Deletes the appointments table using SQL
        """
        self.conn.execute("""DROP TABLE IF EXISTS appointments""")
        self.conn.commit()

    def get_all_appointments(self):
        """
        Returns all appointments in the table using SQL
        """
        cursor = self.conn.execute("""SELECT * FROM appointments""")
        appointments = []
        for row in cursor:
            appointments.append({
                "id": row[0],
                "location": row[1],
                "worker_id": row[2],
                "client_id": row[3],
                "expected_start": row[4],
                "expected_end": row[5]
            })
        return appointments

    def get_appointment_by_id(self, appointment_id):
        """
        Returns an appointment by its ID
        """
        cursor = self.conn.execute("SELECT * FROM appointments WHERE id = ?;", (appointment_id,))
        row = cursor.fetchone()
        if row:
            return {
                "id": row[0],
                "location": row[1],
                "worker_id": row[2],
                "client_id": row[3],
                "expected_start": row[4],
                "expected_end": row[5]
            }
        return None

    def insert_appointment(self, location, worker_id, client_id, expected_start, expected_end):
        """
        Inserts a new appointment into the appointments table with provided values.
        """
        # Convert location tuple to string format (e.g., "40.7128,-74.0060")
        location_str = f"{location[0]},{location[1]}"
        
        cursor = self.conn.execute("""
            INSERT INTO appointments (location, worker_id, client_id, expected_start, expected_end)
            VALUES (?, ?, ?, ?, ?);
        """, (location_str, worker_id, client_id, expected_start, expected_end))
        
        self.conn.commit()
        return cursor.lastrowid


    def delete_appointment(self, appointment_id):
        """
        Deletes an appointment from the appointments table using SQL
        """
        self.conn.execute("DELETE FROM appointments WHERE id = ?;", (appointment_id,))
        self.conn.commit()
