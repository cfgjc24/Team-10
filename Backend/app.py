import json
import datetime

from flask import Flask , request
import requests
import os
from dotenv import load_dotenv

load_dotenv()
Location_API_Key = os.getenv("IP_API_KEY")
app = Flask(__name__)
@app.route("/")
def home():
    client_ip = request.remote_addr
    UserLat , UserLong  = proccessLocation(client_ip)
    if (UserLat,UserLong) == (-1,-1):
        return "Invalid IP Address -> Handle error here"
    print(f"Users Locations Data that will be passed to DB {UserLat,UserLong}")
    return "Hello World"

def proccessLocation(ip:str):
    print(f"Ip address being procces {ip}")
    response = requests.get(f"https://ipgeolocation.abstractapi.com/v1/?api_key={Location_API_Key}&ip_address={ip}")
    if response.status_code == 200:
        if ip == "127.0.0.1": # so thigns dont break on local testing
            return (-74.0792,40.731)
        print(response.content)
        return (response.content["longitude"], response.content["longitude"])
    else:
        print(f"non 200 status code: {response.status_code}")
        print(response.content)
        return (-1,-1)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
