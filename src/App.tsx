import React from 'react';
import './App.css';
import Map from "./components/Map/Map";
import Services from "./components/Services/Services";


function App() {
  return (
      <div className="MainContainer">
          <div className="Services">
              <Services/>
          </div>
          <Map/>
      </div>
  );
}

export default App;
