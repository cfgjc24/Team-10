class ClientManager:
    def __init__(self, conn):
        self.conn = conn

    def create_client_table(self):
        """
        Creates a client table using SQL
        """
        self.conn.execute("""CREATE TABLE IF NOT EXISTS clients(
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                name TEXT NOT NULL,
                                description STRING NULL,
                                over_eighteen BOOLEAN NOT NULL
                            );""")
        self.conn.commit()

    def delete_client_table(self):
        """
        Deletes the client table using SQL
        """
        self.conn.execute("""DROP TABLE IF EXISTS clients""")
        self.conn.commit()

    def get_all_client(self):
        """
        Returns all clients in the table using SQL
        """
        cursor = self.conn.execute("""SELECT * FROM clients""")
        workers = []
        for row in cursor:
            workers.append({"id": row[0], "name": row[1], "description": row[2], "over_eighteen": row[3]})
        return workers

    def get_client_by_id(self, client_id):
        """
        Returns a client by its ID
        """
        cursor = self.conn.execute("SELECT * FROM client WHERE id = ?;", (client_id))
        for row in cursor:
            return ({"id": row[0], "name": row[1], "description": row[2], "over_eighteen": row[3]})
        return None

    def insert_client_table(self, name, over_eighteen, description=None):
        """
        Inserts a new client into the clients table with default values.
        """
        cursor = self.conn.execute("""
            INSERT INTO clients (name, description, over_eighteen)
            VALUES (?, ?, ?);
        """, (name, description, over_eighteen))
        
        self.conn.commit()
        return cursor.lastrowid

    def delete_client_from_table(self, client_id):
        """
        Deletes a worker from the worker table using SQL
        """
        self.conn.execute("DELETE FROM clients WHERE id = ?;", (client_id))
        self.conn.commit()

    