import time
import random
import json
from azure.iot.device import IoTHubDeviceClient, MethodRequest, MethodResponse, Message

CONNECTION_STRING = "HostName=SmartInventoryHubRG.azure-devices.net;DeviceId=SimulatedDevicePython;SharedAccessKey=A4gvXV5Qz1g6n/MjjJ6TQw5B35yPncNBADkssnZms0w="

TELEMETRY_INTERVAL = 5

def generate_sensor_data(counter):
    temperature = round(random.uniform(20.0, 30.0), 2)
    humidity = round(random.uniform(30.0, 70.0), 2)
    weight = round(random.uniform(50.0, 100.0), 2)
    distance = 5.0 if (counter % 5 == 0) else 1.0
    return {
        "temperature": temperature,
        "humidity": humidity,
        "weight": weight,
        "distance": distance
    }

def handle_method_request(method_request: MethodRequest):
    global TELEMETRY_INTERVAL
    if method_request.name == "setTelemetryInterval":
        try:
            new_interval = method_request.payload.get("interval", 5)
            TELEMETRY_INTERVAL = new_interval
            payload = {"result": True, "interval": TELEMETRY_INTERVAL}
            status = 200
        except Exception as e:
            payload = {"result": False, "error": str(e)}
            status = 400
    else:
        payload = {"result": False, "error": "Unknown method"}
        status = 404

    return MethodResponse.create_from_method_request(method_request, status, payload)

def main():
    client = IoTHubDeviceClient.create_from_connection_string(CONNECTION_STRING)
    client.on_method_request_received = lambda req: client.send_method_response(handle_method_request(req))
    counter = 1
    try:
        while True:
            data = generate_sensor_data(counter)
            msg = Message(json.dumps(data))
            msg.content_encoding = "utf-8"
            msg.content_type = "application/json"
            print(f"Sending message #{counter}: {data}")
            client.send_message(msg)
            counter += 1
            time.sleep(TELEMETRY_INTERVAL)
    except KeyboardInterrupt:
        pass
    finally:
        client.shutdown()

if __name__ == "__main__":
    main()
