import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  

import LogIn from './log_in';
import UserManagement from './UserManagement';
import DeviceManagement from './DeviceManagement';

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/logIn" replace />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/DeviceManagement" element={<DeviceManagement />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<Main />, document.getElementById('root')); 