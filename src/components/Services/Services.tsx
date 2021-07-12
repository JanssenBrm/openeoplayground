import React, {useEffect, useState} from 'react';
import {Button, Spinner} from 'react-bootstrap';
import {getServices} from '../../services/OpenEO';
import styles from './Services.module.css';


const _getServices = (setServices: Function, setLoading: Function) => {
    setLoading(true);
    getServices()
        .then((Services: any) => {
            setServices(Services)
        })
        .finally(() => setLoading(false));
}


const toggleExpanded = (id: string, expanded: string | undefined, setExpanded: Function) => {
    if (expanded === id) {
        setExpanded(undefined);
    } else {
        setExpanded(id);
    }
}

const Services = () => {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState<string | undefined>(undefined);
    const [logs, setLogs] = useState<string[]>([]);


    useEffect(() => {
        _getServices(setServices, setLoading);
    }, []);

    useEffect(() => {
        if (expanded) {
        }
    }, [expanded])

    return (
        <div className={styles.ServicesContainer}>
            <div className={styles.ServicesHeader}>
                <h3>Services</h3>
                <Button onClick={() => _getServices(setServices, setLoading)} disabled={loading}>
                    {
                        loading ? (
                                <Spinner animation="border"/>
                            ) :
                            'Refresh'
                    }
                </Button>
            </div>
            <div className={styles.ServiceList}>
                {
                    services.map((s: any) => (
                        <div className={styles.Service} onClick={() => toggleExpanded(s.id, expanded, setExpanded)}>
                            <div className={styles.ServiceRow}>
                                <div className={styles.ServiceDate}>
                                    {s.created}
                                </div>
                                <div className={styles.ServiceInfo}>
                                    <div className={styles.ServiceTitle}>
                                        {s.title || 'Service'} - {s.type.toUpperCase()}
                                    </div>
                                    <div className={styles.ServiceDescription}>
                                        {s.url || ''}
                                    </div>
                                </div>
                                <div className={styles[s.enabled ? 'ACTIVE' : 'INACTIVE']}>
                                    {s.enabled ? 'ACTIVE' : 'INACTIVE'}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Services;

