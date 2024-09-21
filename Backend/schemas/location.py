class LocationManager:
    def __init__(self, conn):
        self.conn = conn

    def create_location_table(self):
        """
        Creates a locations table using SQL
        """
        self.conn.execute("""CREATE TABLE IF NOT EXISTS locations(
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                coordinates POINT NOT NULL,
                                location_type INTEGER NOT NULL
                            );""")
        self.conn.commit()

    def delete_location_table(self):
        """
        Deletes the locations table using SQL
        """
        self.conn.execute("""DROP TABLE IF EXISTS locations""")
        self.conn.commit()

    def get_all_locations(self):
        """
        Returns all locations in the table using SQL
        """
        cursor = self.conn.execute("""SELECT * FROM locations""")
        locations = []
        for row in cursor:
            locations.append({
                "id": row[0],
                "coordinates": row[1],
                "location_type": row[2]
            })
        return locations

    def get_location_by_id(self, location_id):
        """
        Returns a location by its ID
        """
        cursor = self.conn.execute("SELECT * FROM locations WHERE id = ?;", (location_id,))
        row = cursor.fetchone()
        if row:
            return {
                "id": row[0],
                "coordinates": row[1],
                "location_type": row[2]
            }
        return None

    def insert_location(self, coordinates, location_type):
        """
        Inserts a new location into the locations table with provided values.
        """
        # Convert coordinates to a string format (e.g., "40.7128,-74.0060")
        coordinates_str = f"{coordinates[0]},{coordinates[1]}"
        
        cursor = self.conn.execute("""
            INSERT INTO locations (coordinates, location_type)
            VALUES (?, ?);
        """, (coordinates_str, location_type))
        
        self.conn.commit()
        return cursor.lastrowid


    def delete_location(self, location_id):
        """
        Deletes a location from the locations table using SQL
        """
        self.conn.execute("DELETE FROM locations WHERE id = ?;", (location_id,))
        self.conn.commit()
