import React from "react";
import { Button } from "react-bootstrap";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { FaPencilAlt } from 'react-icons/fa';
import { CamelCase } from "../../../../services/Utils.t";
import  styles from './GeometryParam.module.css';

class GeometryParam extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Button>
                <FaPencilAlt/>
                <span className={styles.Type}>{CamelCase(this.props.type)}</span>
            </Button>
        )
    }
}

export default GeometryParam;
