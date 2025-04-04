// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
// import App from './App'; // Import your App component

// ReactDOM.render(
//   <BrowserRouter> {/* Wrap the app with BrowserRouter */}
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );



import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

