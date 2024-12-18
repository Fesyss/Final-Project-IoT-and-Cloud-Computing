import time
import random
import json
from azure.iot.device import IoTHubDeviceClient, Message

# our key from IoT hub 

CONNECTION_STRING = "HostName=smart-inventory-hub.azure-devices.net;DeviceId=simulated-device;SharedAccessKey=0xokZYfktAPDDmVIVnRl7lLR4gjFGA7rQiw3Fwag+28="

def generate_sensor_data(counter):
    temperature = round(random.uniform(20.0, 30.0), 2)  
    humidity = round(random.uniform(30.0, 70.0), 2)     
    weight = round(random.uniform(50.0, 100.0), 2)      

    # if there's 5 it means 5 m and 1 is 1 m 
    if counter % 5 == 0:
        distance = 5.0
    else:
        distance = 1.0

    return {
        "temperature": temperature,
        "humidity": humidity,
        "weight": weight,
        "distance": distance
    }

def main():
    # con to IoT hub
    client = IoTHubDeviceClient.create_from_connection_string(CONNECTION_STRING)

    print("Sending data to IoT Hub.")
    counter = 1
    try:
        while True:
            data = generate_sensor_data(counter)
            message = Message(json.dumps(data))
            message.content_encoding = "utf-8"
            message.content_type = "application/json"

            print(f"Sending message #{counter}: {data}")
            client.send_message(message)
            print("Message sent!")
            counter += 1
            time.sleep(5) #5s
    except KeyboardInterrupt:
        print("Process interrupted by user.")
    finally:
        client.shutdown()

if __name__ == "__main__":
    main()
