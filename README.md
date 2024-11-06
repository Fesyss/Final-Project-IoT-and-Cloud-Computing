# Smart Inventory Management System (SIMS)

## Overview

The Smart Inventory Management System (SIMS) is an IoT-powered solution for monitoring and managing warehouse inventory. It helps companies optimize storage, reduce waste, and ensure efficient operations through real-time tracking and data insights.

# Business Description

SIMS benefits sectors like retail, pharmaceuticals, and food storage by automating inventory tracking, reducing manual labor, and enhancing product safety. Its sensors monitor stock levels, shelf occupancy, temperature, and humidity to prevent loss and maintain optimal conditions. Alerts notify staff about critical changes, supporting swift action and cost savings.

# Features

- Real-Time Monitoring: Tracks stock levels, environmental conditions, and shelf occupancy.
- Automated Alerts: Issues alerts when inventory is low or conditions are out of range.
- Data Dashboard: A web-based dashboard displays sensor data for easy oversight.
- Role-Based Access: Differentiates permissions for staff and administrators.

# Sensors

Weight Sensors: Track item quantities on shelves.
Temperature Sensors: Ensure conditions for sensitive products.
Humidity Sensors: Regulate storage conditions to prevent damage.

## Project Structure

SIMS consists of a frontend dashboard, backend data management, and Azure IoT integration:

- Frontend: Displays real-time data, alerts, and inventory summaries.
- Backend: Manages data collection, storage, and alert triggers.
- IoT Integration: Uses Azure IoT Hub to manage sensor data, simulate environments, and create device twins.

## Setup and Running the Project

### Prerequisites

  - Software: Node.js, an IDE like VS Code, an Azure account with IoT capabilities.
 
### Installation and Setup	
 
 1. Clone the Repository:
 
		git clone https://github.com/YourRepo/SmartInventorySystem.git

 2. Run the Backend:
   
  - Set up a local server and connect to Azure IoT Hub for sensor data.

 3. Run the Frontend:
  
  - Use npm start in the frontend directory to launch the dashboard.

4. Sensor Simulation:

  - Use mock data scripts to simulate real-world data from weight, temperature, humidity, and presence sensors.

### Testing and Deployment

- Testing: 	Ensure Azure IoT connections and mock sensors work effectively.
- Deployment: 	Use deployment scripts to set up in production and monitor performance with Postman.

## Contributing

Since this project is created as part of a university assignment, contributions are limited to team members and designated collaborators. Please coordinate with the project lead or instructor for any updates or 		pull requests.

## License

This project is for educational use only and may not be used or distributed outside the university without prior permission.
