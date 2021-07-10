import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Map from "./components/Map/Map";
import Services from "./components/Services/Services";
import { Toast } from './components/Toasts/toast.model';
import Toasts from './components/Toasts/Toasts';
import { AppStore } from './stores/app.model';


function App() {
    const toasts: Toast[] = useSelector((state: AppStore) => state.ui.toasts)
  return (
      <div className="MainContainer">
          <div className="Services">
              <Services/>
          </div>
          <Map/>
          <div className="Toasts">
              <Toasts  toasts={toasts}></Toasts>
          </div>
      </div>
  );
}

export default App;
