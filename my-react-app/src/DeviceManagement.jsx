import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import './DeviceManagement.css';

const DeviceManagement = () => {
  const navigate = useNavigate();
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  const [timestampData, setTimestampData] = useState([]);

  // Navigate back to User Management
  const handleNavigateBack = () => {
    navigate('/UserManagement');
  };
  // Fetch Temperature Data
  const fetchTemperatureStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/temperature-stats');
      const result = await response.json();
      if (result.success) {
        setTemperatureData(result.data);
      } else {
        console.error('Error fetching temperature data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching temperature data:', error);
    }
  };
  // Fetch Humidity Data
  const fetchHumidityStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/humidity-stats');
      const result = await response.json();
      if (result.success) {
        setHumidityData(result.data);
      } else {
        console.error('Error fetching humidity data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching humidity data:', error);
    }
  };
  // Fetch Weight Data
  const fetchWeightStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/weight-stats');
      const result = await response.json();
      if (result.success) {
        setWeightData(result.data);
      }
    } catch (error) {
      console.error('Error fetching weight data:', error);
    }
  };
  // Fethch Distance Data
  const fetchDistanceStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/distance-stats');
      const result = await response.json();
      if (result.success) {
        setDistanceData(result.data);
      }
    } catch (error) {
      console.error('Error fetching distance data:', error);
    }
  };
  // Fetch Timestamp Data
  const fetchTimestampStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/timestamp-stats');
      const result = await response.json();
      if (result.success) {
        setTimestampData(result.data);
      }
    } catch (error) {
      console.error('Error fetching timestamp data:', error);
    }
  };
 // Fetch all data in parallel
 useEffect(() => {
    const fetchStats = async () => {
      try {
        await Promise.all([
            fetchTemperatureStats(), 
            fetchHumidityStats(), 
            fetchWeightStats(), 
            fetchDistanceStats(),
            fetchTimestampStats()
        ]);
      } catch (error) {
        console.error('Error during parallel fetch:', error);
      }
    };
    fetchStats();
  }, []);
  // Render Temperature Chart
  useEffect(() => {
    if (temperatureData.length > 0) {
      const ctx = document.getElementById('temperatureChart').getContext('2d');

      const labels = temperatureData.map((entry) =>
        new Date(entry.eventProcessedUtcTime).toLocaleTimeString()
      );
      const data = temperatureData.map((entry) => entry.temperature);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Temperature',
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 5,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [temperatureData]);

  // Render Humidity Chart
  useEffect(() => {
    if (humidityData.length > 0) {
      const ctx = document.getElementById('humidityChart').getContext('2d');

      const labels = humidityData.map((entry) =>
        new Date(entry.eventProcessedUtcTime).toLocaleTimeString()
      );
      const data = humidityData.map((entry) => entry.humidity);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Humidity',
              data,
              backgroundColor: 'rgba(192, 75, 192, 0.2)',
              borderColor: 'rgba(192, 75, 192, 1)',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 5,
              pointBackgroundColor: 'rgba(192, 75, 192, 1)',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [humidityData]);

  // Render Weight Chart
  useEffect(() => {
    if (weightData.length > 0) {
      const ctx = document.getElementById('weightChart').getContext('2d');
      const labels = weightData.map((entry) =>
        new Date(entry.eventProcessedUtcTime).toLocaleTimeString()
      );
      const data = weightData.map((entry) => entry.weight);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Weight',
              data,
              backgroundColor: 'rgba(192, 192, 75, 0.2)',
              borderColor: 'rgba(192, 192, 75, 1)',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 5,
              pointBackgroundColor: 'rgba(192, 192, 75, 1)',
            },
          ],
        },
      });
    }
  }, [weightData]);
  // Render Stepped Distance Chart
  useEffect(() => {
    if (distanceData.length > 0) {
      const ctx = document.getElementById('distanceChart').getContext('2d');
      const labels = distanceData.map((entry) =>
        new Date(entry.eventProcessedUtcTime).toLocaleTimeString()
      );
      const data = distanceData.map((entry) => entry.distance);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Distance',
              data,
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              stepped: true, // Enables the stepped line chart
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              pointStyle: 'rectRot',
              pointRadius: 5,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [distanceData]);
  // Render Timestamp Chart (Bar Chart)
  useEffect(() => {
    if (timestampData.length > 0) {
      const ctx = document.getElementById('timestampChart').getContext('2d');
      const labels = timestampData.map((entry) =>
        new Date(entry.eventProcessedUtcTime).toLocaleTimeString()
      );

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Timestamp Records',
              data: Array(timestampData.length).fill(1), // Dummy values (equal count per timestamp)
              backgroundColor: 'rgba(99, 132, 255, 0.5)',
              borderColor: 'rgba(99, 132, 255, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    }
  }, [timestampData]);
  return (
    <div className="device-management-page">
        <div className="logo">
            <div className="logo-title">GS</div>
            <div className="logo-subtitle">Global Storage</div>
        </div>
        <div className="content">
            <div className='first-conteiner'>
                <div className='title-chart-wrapper'>
                    <canvas id="weightChart" width="550" height="200" className='weight-chart'></canvas> 
                    <canvas id="humidityChart" width="500" height="200" className='humidity-chart'></canvas>
                </div>
            </div>
            <div className='timestampchart-section'>
            <h1 className='title-device'>Device Management</h1>
                <canvas id="timestampChart" width="600" height="300"></canvas> 
            </div>
            <div className="device-section">
                <canvas id="temperatureChart" width="500" height="200" className='temperature-chart'></canvas>
                <canvas id="distanceChart" width="500" height="200" className='distance-chart'></canvas>
            </div>
        </div>
        <div className="back-section">
            <button className="back-button" onClick={handleNavigateBack}>
                Back to User Management
            </button>
        </div>
    </div>
  );
};

export default DeviceManagement;