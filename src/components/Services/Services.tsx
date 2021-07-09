import React, {ChangeEvent} from 'react';
import styles from './Services.module.css';
import {getServices} from "../../services/OpenEO";
import {OpenEOProcess, OpenEOProcessParam} from "../../interfaces/OpenEOProcess";


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
        <div>
            <div>{s.id}</div>
            {
                s.parameters.map((p: OpenEOProcessParam) => this.renderParam(p))
            }
        </div>
    )

    renderParam = (p: OpenEOProcessParam) => (
        <div>
            <div>{p.name}</div>
            <div>{p.description}</div>
        </div>
    )

    render() {
        return (
            <div>
                <select onChange={this.updateSelected}>
                    <option disabled selected>Select</option>
                    {
                        this.state.services.map((s: OpenEOProcess) => this.renderServiceSelect(s))
                    }
                </select>
                {this.state.selected ? this.renderServiceInfo(this.state.selected) : ''}
            </div>

        );
    }
};

export default Services;
