import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import './App.css';
import Map from "./components/Map/Map";
import Sidebar from './components/Sidebar/Sidebar';
import {SidebarRoute} from './components/Sidebar/Sidebar.model';
import {Toast} from './components/Toasts/toast.model';
import Toasts from './components/Toasts/Toasts';
import {AppStore} from './stores/app.model';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Jobs from './components/Jobs/Jobs';
import Processes from './components/Processes/Processes';
import {FaClipboardList, FaEye, FaPlay } from 'react-icons/fa';
import Services from './components/Services/Services';


function App() {
    const toasts: Toast[] = useSelector((state: AppStore) => state.ui.toasts)
    const routes: SidebarRoute[] = [
        {
            label: 'Processes',
            route: '/processes',
            icon: (
                <FaPlay className="Icon"/>
            )
        },
        {
            label: 'Jobs',
            route: '/jobs',
            icon: (
                <FaClipboardList className="Icon"/>
            )
        },
        {
            label: 'Services',
            route: '/services',
            icon: (
                <FaEye className="Icon"/>
            )
        }];

    useEffect(() => {
       document.title = 'OpenEO Playground'
    }, []);

    return (
        <Router>
            <div className="MainContainer">
                <div className="SideBar">
                    <Sidebar routes={routes}/>
                </div>
                <div className="Content">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return (
                                    <Redirect to="/processes" />
                                )
                            }}
                        />
                        <Route path="/processes">
                            <div className="Services">
                                <Processes/>
                            </div>
                            <Map/>
                            <div className="Toasts">
                                <Toasts toasts={toasts}></Toasts>
                            </div>
                        </Route>
                        <Route path="/jobs">
                           <Jobs/>
                        </Route>
                        <Route path="/services">
                            <Services/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
