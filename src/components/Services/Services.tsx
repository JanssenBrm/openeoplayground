import React, {useEffect, useState} from 'react';
import styles from './Services.module.css';
import {executeService, getServices} from "../../services/OpenEO";
import {OpenEOProcess, OpenEOProcessParam} from "../../interfaces/OpenEOProcess";
import {Button, Form } from 'react-bootstrap';
import IntervalParam from './Params/IntervalParam/IntervalParam';
import GeometryParam from './Params/GeometryParam/GeometryParam';
import { useDispatch } from 'react-redux';
import { addToast } from '../../stores/ui';


const renderServiceSelect = (s: OpenEOProcess) => (
    <option value={s.id} key={s.id}>{s.id}</option>
)

const updateSelected = (event: any, services: OpenEOProcess[], setSelected: any) => setSelected(services.find((s: OpenEOProcess) => s.id === event.target.value));

const renderServiceInfo = (s: OpenEOProcess, dispatch: Function) => (
    <div className={styles.ServiceInfo}>
        <div className={styles.ServiceTitle}>{s.id}</div>
        <div className={styles.Description}>{s.description}</div>
        {
            s ? s.parameters.map((p: OpenEOProcessParam) => renderParam(p)) : ''
        }

        <div className={styles.Execute}>
            <Button className={styles.ExecuteButton} disabled={!paramsValid(s.parameters)} onClick={() => _executeService(s, dispatch)}>Execute</Button>
        </div>
    </div>
)
const _executeService = (p: OpenEOProcess, dispatch: Function): void => {
    executeService(p)
        .then((result: any) => {
           dispatch(addToast({
               id: 'service_execute',
               text: 'Succesfully executed service',
               type: 'success'
           }));


        }).catch((error: string) => {
        dispatch(addToast({
            id: 'service_execute_error',
            text: 'Something went wrong when executing service',
            type: 'danger',
        }));
    })
}

const renderParam = (p: OpenEOProcessParam) => (
    <div className={styles.Param}>
        <div className={styles.Title}>{p.name}</div>
        <div>{p.description}</div>
        <div className={styles.ParamInput}>
            {
                p.schema.type === 'temporal-intervals' ? (
                    <IntervalParam  setValue={(interval: any) => p.value = interval}></IntervalParam>
                ) : ''
            }
            {
                p.schema.type === 'object' ? (
                    <GeometryParam type="polygon" setValue={(feature: any) => p.value = feature}></GeometryParam>
                ) : ''
            }
        </div>
    </div>
)

const paramsValid = (params: OpenEOProcessParam[]): boolean => true; //params.filter((p: OpenEOProcessParam) => !p.value).length === 0;


const Services = (props: any) => {
    const [services, setServices]: [OpenEOProcess[], any] = useState([]);
    const [selected, setSelected]: [OpenEOProcess | undefined, any] = useState(undefined);
    const dispatch = useDispatch();

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
            { selected? renderServiceInfo(selected, dispatch) : ''}
        </div>
    )
}

export default Services;
