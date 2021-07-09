import React, {ChangeEvent} from 'react';
import styles from './Services.module.css';
import {getServices} from "../../services/OpenEO";
import {OpenEOProcess, OpenEOProcessParam} from "../../interfaces/OpenEOProcess";
import { Form } from 'react-bootstrap';
import DateTimeParam from './Params/DateTime/DataTimeParam';
import IntervalParam from './Params/IntervalParam/IntervalParam';

interface ServiceState {
    loading: boolean;
    services: OpenEOProcess[];
    selected: OpenEOProcess | undefined;
}

class Services extends React.Component<any, ServiceState> {

    constructor(props: any) {
        super(props);
        this.state = {
            services: [],
            loading: true,
            selected: undefined
        }
    }

    componentDidMount() {
        getServices()
            .then((services: OpenEOProcess[]) => {
                console.log(services);
                this.setState(({
                    loading: false,
                    services
                }))
            });
    }
    renderServiceSelect = (s: OpenEOProcess) => (
        <option value={s.id} key={s.id}>{s.id}</option>
    )

    updateSelected = (event: any) => {
        this.setState( {
            selected: this.state.services.find((s: OpenEOProcess) => s.id === event.target.value)
        })
    }

    renderServiceInfo = (s: OpenEOProcess) => (
        <div className={styles.ServiceInfo}>
            <div className={styles.ServiceTitle}>{s.id}</div>
            <div className={styles.Description}>{s.description}</div>
            {
                s.parameters.map((p: OpenEOProcessParam) => this.renderParam(p))
            }
        </div>
    )

    renderParam = (p: OpenEOProcessParam) => (
        <div className={styles.Param}>
            <div className={styles.Title}>{p.name}</div>
            <div>{p.description}</div>
            {
                p.schema.type === 'temporal-intervals' ? (
                    <IntervalParam></IntervalParam>
                ) : ''
            }
        </div>
    )

    render() {
        return (
            <div className={styles.ServiceContainer}>
                <div className={styles.ServiceSelect}>
                    <Form.Label>Select your service</Form.Label>
                    <Form.Control as="select" onChange={this.updateSelected}>
                        {
                            this.state.services.map((s: OpenEOProcess) => this.renderServiceSelect(s))
                        }
                    </Form.Control>
                </div>
                {this.state.selected ? this.renderServiceInfo(this.state.selected) : ''}
            </div>

        );
    }
};

export default Services;
