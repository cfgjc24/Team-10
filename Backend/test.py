from db import DatabaseDriver

db_driver = DatabaseDriver()
# Example to insert a worker
worker_id = db_driver.worker_manager.insert_worker_table("Alice", 1)
# Example to get all workers
workers = db_driver.worker_manager.get_all_workers()

print(workers)