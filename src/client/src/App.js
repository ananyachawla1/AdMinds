// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Movies from './components/Movies';

const user = { name: 'John' }; // Placeholder user data

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/" element={<h2>Home</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
