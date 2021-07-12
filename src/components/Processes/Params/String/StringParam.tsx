import React from "react";
import { Form } from "react-bootstrap";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { ParamProps } from "../ParamProps.";

const StringParam = (props: ParamProps) => {
    return (
    <Form.Control value={props.value} onChange={(event: any) => props.setValue(event.target.value)}>
    </Form.Control>
    )
}

export default StringParam;
