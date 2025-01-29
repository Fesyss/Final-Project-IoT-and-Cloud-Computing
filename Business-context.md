**Smart inventory management system (SIMS)**


**Overview:**

The “Smart inventory management system” (SIMS) is an IoT-powered solution for monitoring and managing warehouse inventory. It helps companies optimize storage, reduce waste and ensure efficient operations through real-time tracking and data insights

**Business Description:**

SIMS helps businesses like retails, pharmacies and food warehouses by keeping track of inventory automatically. This reduces the need for manual work and keeps products safe. Sensors check stock levels, shelf space, temperature, and humidity to avoid losses and keep everything in good condition. If something changes, alerts notify staff so they can fix problems quickly and save money

**Features:**

- Real-time monitoring: tracks stock levels, environmental conditions and shelf occupancy
- Automated alerts: issues alerts when inventory is low or conditions are out of range
- Data dashboard: a web-based dashboard displays sensor data for easy oversight
- Role-based access: differentiates permissions for staff and administrators

**Sensors:**

- Weight sensors: track item quantities is storage
- Temperature sensors: ensure conditions for sensitive products
- Humidity sensors: regulate storage conditions to prevent damage

**Project Structure:**

SIMS consists of a frontend dashboard, backend data management and Azure IoT integration:

- Frontend: displays real-time data, alerts and inventory summaries
- Backend: manages data collection, storage and alert triggers
- IoT integration: uses Azure IoT Hub to manage sensor data, simulate environments and create device twins

**Setup and running the project**

**Requerments:**

- Software: Node.js, an IDE like VS Code, an Azure account with IoT capabilities
  
**Installation and setup:**

Clone the Repository:
git clone https://github.com/YourRepo/SmartInventorySystem.git

**Run the backend:**
- Set up a local server and connect to Azure db for data
- And then run command node

**Sensor simulation:**
- Use mock data scripts to simulate real-world data from weight, temperature, humidity, and presence sensors
- For running the script use python3 simulate_device.py

**Testing and Deployment**

- Testing: ensure Azure IoT connections and mock sensors work effectively, and Stream Analytics works and send data to Azure db
- Deployment: use deployment scripts to set up in production and monitor performance with Postman
