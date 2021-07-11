import React from "react";
import { ListGroup } from "react-bootstrap";
import { SidebarProps, SidebarRoute } from "./Sidebar.model";
import styles from './Sidebar.module.css';

const Sidebar = (props: SidebarProps) => {
    return (
        <div className={styles.SidebarContainer}>
            <div className={styles.Header}>
                <div className={styles.Title}>OpenEO</div>
                <div className={styles.SubTitle}>Service playground</div>
            </div>
            <div className={styles.Routes}>
                {
                    props.routes.map((r: SidebarRoute) => (
                        <div className={styles.Route}>{r.label}</div>
                    ))
                }
            </div>
        </div>
    )

}

export default Sidebar;
