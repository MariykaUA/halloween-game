// src/App.js
import React from 'react';
import './index.css';
import HalloweenGame from './components/HalloweenGame';
import GhostCanvas from './components/GhostCanvas';

function App() {
  return (
    <div className="App">
      <h1>Meeting the Ghosts</h1>
      <GhostCanvas />
      <HalloweenGame />
    </div>
  );
}

export default App;

