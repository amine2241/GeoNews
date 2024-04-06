import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/JSON/data')
        .then(response => response.text())
        .then(data => setMessage(data))
        .catch(error => console.error('Error:', error));
  }, []);

  return (
      <div>
          hello
        <h1>{message}</h1>
      </div>
  );
}

export default App;