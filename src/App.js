import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Banner from './components/Banner';
import AppRoutes from './components/routes/AppRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Banner />
        <div className="content">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;