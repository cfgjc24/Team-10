from db import DatabaseDriver

def test_worker_manager(db_driver):
    print("Testing Worker Manager")
    worker_id = db_driver.worker_manager.insert_worker_table("Alice", 1, None)
    print(f"Inserted Worker ID: {worker_id}")
    
    workers = db_driver.worker_manager.get_all_workers()
    print("All Workers:", workers)
    
    worker = db_driver.worker_manager.get_worker_by_id(worker_id)
    print("Worker by ID:", worker)
    
    db_driver.worker_manager.update_worker_status(worker_id, 'arrived')
    updated_worker = db_driver.worker_manager.get_worker_by_id(worker_id)
    print("Updated Worker Status:", updated_worker)
    
    db_driver.worker_manager.delete_worker_from_table(worker_id)
    workers_after_delete = db_driver.worker_manager.get_all_workers()
    print("Workers after deletion:", workers_after_delete)

def test_client_manager(db_driver):
    print("\nTesting Client Manager")
    client_id = db_driver.client_manager.insert_client_table("Bob", False)
    print(f"Inserted Client ID: {client_id}")
    
    clients = db_driver.client_manager.get_all_clients()
    print("All Clients:", clients)
    
    client = db_driver.client_manager.get_client_by_id(client_id)
    print("Client by ID:", client)
    
    db_driver.client_manager.delete_client_from_table(client_id)
    clients_after_delete = db_driver.client_manager.get_all_clients()
    print("Clients after deletion:", clients_after_delete)

def test_admin_manager(db_driver):
    print("\nTesting Admin Manager")
    admin_id = db_driver.admin_manager.insert_admin_table("Charlie")
    print(f"Inserted Admin ID: {admin_id}")
    
    admins = db_driver.admin_manager.get_all_admins()
    print("All Admins:", admins)
    
    db_driver.admin_manager.delete_admin_from_table(admin_id)
    admins_after_delete = db_driver.admin_manager.get_all_admins()
    print("Admins after deletion:", admins_after_delete)

def test_location_manager(db_driver):
    print("\nTesting Location Manager")
    location_id = db_driver.location_manager.insert_location((40.7128, -74.0060), 1)
    print(f"Inserted Location ID: {location_id}")
    
    locations = db_driver.location_manager.get_all_locations()
    print("All Locations:", locations)
    
    location = db_driver.location_manager.get_location_by_id(location_id)
    print("Location by ID:", location)
    
    db_driver.location_manager.delete_location(location_id)
    locations_after_delete = db_driver.location_manager.get_all_locations()
    print("Locations after deletion:", locations_after_delete)

def test_appointment_manager(db_driver):
    print("\nTesting Appointment Manager")
    appointment_id = db_driver.appointment_manager.insert_appointment((40.7128, -74.0060), 1, 1, '2023-09-20 10:00:00', '2023-09-20 11:00:00')
    print(f"Inserted Appointment ID: {appointment_id}")
    
    appointments = db_driver.appointment_manager.get_all_appointments()
    print("All Appointments:", appointments)
    
    appointment = db_driver.appointment_manager.get_appointment_by_id(appointment_id)
    print("Appointment by ID:", appointment)
    
    db_driver.appointment_manager.delete_appointment(appointment_id)
    appointments_after_delete = db_driver.appointment_manager.get_all_appointments()
    print("Appointments after deletion:", appointments_after_delete)

if __name__ == "__main__":
    db_driver = DatabaseDriver()
    
    test_worker_manager(db_driver)
    test_client_manager(db_driver)
    test_admin_manager(db_driver)
    test_location_manager(db_driver)
    test_appointment_manager(db_driver)