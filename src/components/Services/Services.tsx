import React, {useEffect, useState} from 'react';
import styles from './Services.module.css';
import {getServices} from "../../services/OpenEO";
import {OpenEOProcess, OpenEOProcessParam} from "../../interfaces/OpenEOProcess";
import { Form } from 'react-bootstrap';
import IntervalParam from './Params/IntervalParam/IntervalParam';
import GeometryParam from './Params/GeometryParam/GeometryParam';


const renderServiceSelect = (s: OpenEOProcess) => (
    <option value={s.id} key={s.id}>{s.id}</option>
)

const updateSelected = (event: any, services: OpenEOProcess[], setSelected: any) => setSelected(services.find((s: OpenEOProcess) => s.id === event.target.value));

const renderServiceInfo = (s: OpenEOProcess) => (
    <div className={styles.ServiceInfo}>
        <div className={styles.ServiceTitle}>{s.id}</div>
        <div className={styles.Description}>{s.description}</div>
        {
            s ? s.parameters.map((p: OpenEOProcessParam) => renderParam(p)) : ''
        }
    </div>
)

const renderParam = (p: OpenEOProcessParam) => (
    <div className={styles.Param}>
        <div className={styles.Title}>{p.name}</div>
        <div>{p.description}</div>
        <div className={styles.ParamInput}>
            {
                p.schema.type === 'temporal-intervals' ? (
                    <IntervalParam></IntervalParam>
                ) : ''
            }
            {
                p.schema.type === 'object' ? (
                    <GeometryParam type="polygon"></GeometryParam>
                ) : ''
            }
        </div>
    </div>
)

const Services = (props: any) => {
    const [services, setServices]: [OpenEOProcess[], any] = useState([]);
    const [selected, setSelected]: [OpenEOProcess | undefined, any] = useState(undefined);

   //useSelector((state: AppStore) => state.ui.interaction)

    useEffect(() => {
        getServices()
            .then((services: OpenEOProcess[]) => {
              setServices(services);
            });
    },[]);

    return (
        <div className={styles.ServiceContainer}>
            <div className={styles.ServiceSelect}>
                <Form.Label>Select your service</Form.Label>
                <Form.Control as="select" onChange={(event: any) => updateSelected(event, services, setSelected)}>
                    {
                        services.map((s: OpenEOProcess) => renderServiceSelect(s))
                    }
                </Form.Control>
            </div>
            { selected? renderServiceInfo(selected) : ''}
        </div>
    )
}

export default Services;
