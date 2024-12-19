import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import HomeScreen from './components/HomeScreen';
import Calculator from '../Calculator';
// Import other components as needed

const AppRoutes = () => {
  const routes = [
    // { path: '/', element: <HomeScreen /> },
    { path: '/calculator', element: <Calculator /> },
    // Add more routes here as needed
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;