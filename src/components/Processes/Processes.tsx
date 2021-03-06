import React, {useEffect, useState} from 'react';
import styles from './Processes.module.css';
import {createPreviewService, getProcesses, executeProcess, buildProcessGraph} from "../../services/OpenEO";
import {OpenEOProcess, OpenEOProcessParam} from "../../interfaces/OpenEOProcess";
import {Button, Form, Spinner} from 'react-bootstrap';
import IntervalParam from './Params/IntervalParam/IntervalParam';
import GeometryParam from './Params/GeometryParam/GeometryParam';
import {useDispatch, useSelector} from 'react-redux';
import {addToast} from '../../stores/ui';
import { AppStore } from '../../stores/app.model';
import { setProcess, updateProcessParam } from '../../stores/params';
import StringParam from './Params/StringParam/StringParam';
import NumberParam from './Params/NumberParam/NumberParam';
import ReactJson from 'react-json-view';
import { FaClipboard } from 'react-icons/fa';


const renderServiceSelect = (s: OpenEOProcess) => (
    <option value={s.id} key={s.id}>{s.id}</option>
)

const updateSelected = (event: any, services: OpenEOProcess[], dispatch: Function) => {
    const service = services.find((s: OpenEOProcess) => s.id === event.target.value);
    if (service) {
        dispatch(setProcess(service));
    }
}

const copyToClipboard = (s: OpenEOProcess, dispatch: Function): void => {
    navigator.clipboard.writeText(JSON.stringify(buildProcessGraph(s)));
    dispatch(addToast({
        id: 'copy_ok',
        text: `Succesfully copied process graph to clipboard`,
        type: 'success',
        duration: 2000
    }));

}
const renderServiceInfo = (s: OpenEOProcess,
                           loading: boolean,
                           setLoading: Function,
                           previewLoading: boolean,
                           setPreviewLoading: Function,
                           showGraph: boolean,
                           setShowGraph: Function,
                           dispatch: Function) => (
    <div className={styles.ServiceInfo}>
        <div className={styles.ServiceTitle}>{s.id}</div>
        <div className={styles.Description}>{s.description}</div>
        {
            s ? s.parameters.map((p: OpenEOProcessParam) => renderParam(p, dispatch)) : ''
        }

        <div className={styles.Execute}>
            <Button className={styles.ExecuteButton} disabled={!paramsValid(s.parameters) || previewLoading || loading}
                    onClick={() => _executeService(s, setLoading, dispatch)}>
                {
                    loading ? (
                            <Spinner animation="border"/>
                        ) :
                        'Execute'
                }
            </Button>
            <Button className={styles.ExecuteButton} disabled={!paramsValid(s.parameters) || previewLoading || loading}
                    onClick={() => _generatePreview(s, setPreviewLoading, dispatch)}>
                {
                    previewLoading ? (
                            <Spinner animation="border"/>
                        ) :
                        'Preview'
                }
            </Button>
        </div>
        <div className={styles.ProcessGraph}>
            <span className={styles.ProcessGraphToggle} onClick={() => setShowGraph(!showGraph)}>{
                showGraph ? 'Hide' : 'Show'
            } graph</span>
        {
            showGraph ? (
                <div>
                    <ReactJson src={buildProcessGraph(s)}></ReactJson>
                    <div className={styles.ClipboardCopy} onClick={() => copyToClipboard(s, dispatch)}>
                        Copy to clipboard
                    </div>
                </div>

            ) : ''
        }
        </div>
    </div>
)
const _executeService = (p: OpenEOProcess, setLoading: Function, dispatch: Function): void => {
    setLoading(true);
    executeProcess(p)
        .then((result: string) => {
            dispatch(addToast({
                id: 'service_execute',
                text: `Succesfully executed service: ${result}`,
                type: 'success'
            }));
        }).catch((error: string) => {
        dispatch(addToast({
            id: 'service_execute_error',
            text: 'Something went wrong when executing service',
            type: 'danger',
        }))
    }).finally(() => {
        setLoading(false);
    })
}

const _generatePreview = (p: OpenEOProcess, setLoading: Function, dispatch: Function): void => {
    setLoading(true);
    createPreviewService(p)
        .then((result: any) => {
            console.log("RESULT", result);
            dispatch(addToast({
                id: 'preview_success',
                text: `Succesfully created preview service`,
                type: 'success'
            }));
        }).catch((error: string) => {
        dispatch(addToast({
            id: 'preview_error',
            text: 'Something went wrong when creating viewing service',
            type: 'danger',
        }))
    }).finally(() => {
        setLoading(false);
    })
}

const updateParam = (p: OpenEOProcessParam, value: any, dispatch: Function) => {
    if (p.value !== value) {
        dispatch(updateProcessParam({
            ...p,
            value
        }));
    }
}

const renderParam = (p: OpenEOProcessParam, dispatch: Function) => (
    <div className={styles.Param}>
        <div className={styles.Title}>{p.name}</div>
        <div>{p.description}</div>
        <div className={styles.ParamInput}>
            {
                p.schema.type === 'temporal-intervals' ? (
                    <IntervalParam value={p.value} setValue={(interval: any) => updateParam(p, interval, dispatch)}></IntervalParam>
                ) : ''
            }
            {
                p.schema.type === 'object' ? (
                    <GeometryParam type="polygon" setValue={(feature: any) => updateParam(p, feature, dispatch)}></GeometryParam>
                ) : ''
            }
            {
                p.schema.type === 'string' ? (
                    <StringParam value={p.value} setValue={(text: any) => updateParam(p, text, dispatch)}></StringParam>
                ) : ''
            }
            {
                p.schema.type === 'number' ? (
                    <NumberParam value={p.value} setValue={(text: any) => updateParam(p, text, dispatch)}></NumberParam>
                ) : ''
            }
        </div>
    </div>
)

const paramsValid = (params: OpenEOProcessParam[]): boolean => params.filter((p: OpenEOProcessParam) => !p.value).length === 0;

const Processes = (props: any) => {
    const [services, setServices]: [OpenEOProcess[], any] = useState([]);
    const [execLoading, setExecLoading] = useState(false);
    const [previewLoading, setPreviewLoading] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const dispatch = useDispatch();
    const selected: OpenEOProcess | undefined = useSelector((state: AppStore) => state.params.process);

    useEffect(() => {
        getProcesses()
            .then((services: OpenEOProcess[]) => {
                setServices(services);
            });
    }, []);

    return (
        <div className={styles.ServiceContainer}>
            <div className={styles.ServiceSelect}>
                <Form.Control as="select" onChange={(event: any) => updateSelected(event, services, dispatch)}>
                    <option selected disabled key='none'>Select a service</option>
                    {
                        services.map((s: OpenEOProcess) => renderServiceSelect(s))
                    }
                </Form.Control>
            </div>
            {selected ? renderServiceInfo(selected, execLoading, setExecLoading, previewLoading, setPreviewLoading, showGraph, setShowGraph, dispatch) : ''}
        </div>
    )
}

export default Processes;
