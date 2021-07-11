import React from 'react';
import {useSelector} from 'react-redux';
import './App.css';
import Map from "./components/Map/Map";
import Services from "./components/Services/Services";
import Sidebar from './components/Sidebar/Sidebar';
import { SidebarRoute } from './components/Sidebar/Sidebar.model';
import {Toast} from './components/Toasts/toast.model';
import Toasts from './components/Toasts/Toasts';
import {AppStore} from './stores/app.model';


function App() {
    const toasts: Toast[] = useSelector((state: AppStore) => state.ui.toasts)
    const routes: SidebarRoute[] = [
        {
            label: 'Services'
        },
        {
            label: 'Jobs'
        }];
    return (
        <div className="MainContainer">
            <div className="SideBar">
                <Sidebar routes={routes}/>
            </div>
            <div className="Content">
                <div className="Services">
                    <Services/>
                </div>
                <Map/>
                <div className="Toasts">
                    <Toasts toasts={toasts}></Toasts>
                </div>
            </div>
        </div>
    );
}

export default App;
