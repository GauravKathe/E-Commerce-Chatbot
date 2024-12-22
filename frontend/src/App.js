import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import './styles/main.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      {!authenticated ? (
        <Login setAuthenticated={setAuthenticated} />
      ) : (
        <Chat setAuthenticated={setAuthenticated} />
      )}
    </div>
  );
}

export default App; 