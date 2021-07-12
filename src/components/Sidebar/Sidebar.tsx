import React  from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarProps, SidebarRoute } from "./Sidebar.model";
import styles from './Sidebar.module.css';

const Sidebar = (props: SidebarProps) => {
    let location = useLocation();
    return (
        <div className={styles.SidebarContainer}>
            <div className={styles.Header}>
                <div className={styles.Title}>OpenEO</div>
                <div className={styles.SubTitle}>Service playground</div>
            </div>
            <div className={styles.Routes}>
                {
                    props.routes.map((r: SidebarRoute) => (
                        <Link className={[styles.Route, location.pathname === r.route ? styles.ActiveRoute : ''].join(' ')} to={r.route}>{r.icon} <span className={styles.RouteLabel}>{r.label}</span></Link>
                    ))
                }
            </div>
        </div>
    )

}

export default Sidebar;
