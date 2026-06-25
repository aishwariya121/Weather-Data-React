
import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Container from './components/Container';


function App() {
  
    const [City, setCity] = useState("Navsari");
  return (
  <div className='container p-2'  style={{background: "linear-gradient(180deg, #36325B 0%, #2D2C54 100%)"
  }}>
    <Navbar setCity={setCity}/>
    <Container City={City} setCity={setCity}/>
   
  </div>
  );
}

export default App;
