import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Routes and Route for routing
import Logic from './components/Logic'; // Import the Logic component

const App = () => {
  return (
    <div>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Logic />} />cd {/* Main route */}
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
