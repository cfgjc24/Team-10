class AdminManager:
    def __init__(self, conn):
        self.conn = conn

    def create_admin_table(self):
        """
        Creates a client table using SQL
        """
        self.conn.execute("""CREATE TABLE IF NOT EXISTS admins(
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                name TEXT NOT NULL
                            );""")
        self.conn.commit()

    def delete_admin_table(self):
        """
        Deletes the client table using SQL
        """
        self.conn.execute("""DROP TABLE IF EXISTS admins""")
        self.conn.commit()

    def get_all_admins(self):
        """
        Returns all admins in the table using SQL
        """
        cursor = self.conn.execute("""SELECT * FROM admins""")
        workers = []
        for row in cursor:
            workers.append({"id": row[0], "name": row[1]})
        return workers

    def get_admin_by_id(self, admin_id):
        """
        Returns a admin by its ID
        """
        cursor = self.conn.execute("SELECT * FROM admins WHERE id = ?;", (admin_id))
        for row in cursor:
            return ({"id": row[0], "name": row[1]})
        return None

    def insert_client_table(self, name):
        """
        Inserts a new admin into the clients table with default values.
        """
        cursor = self.conn.execute("""
            INSERT INTO admins (name)
            VALUES (?);
        """, (name))
        
        self.conn.commit()
        return cursor.lastrowid

    def delete_client_from_table(self, admin_id):
        """
        Deletes a admin from the worker table using SQL
        """
        self.conn.execute("DELETE FROM admins WHERE id = ?;", (admin_id))
        self.conn.commit()

    