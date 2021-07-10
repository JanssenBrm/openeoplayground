import React from "react";
import {Button} from "react-bootstrap";
import "react-datetime/css/react-datetime.css";
import {FaPencilAlt} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {CamelCase} from "../../../../services/Utils.t";
import { setInteractionType } from "../../../../stores/ui";
import { UiInteractionType } from "../../../../stores/ui/ui.model";
import styles from './GeometryParam.module.css';


const GeometryParam = (props: any) => {
        const dispatch = useDispatch()
    return (
        <Button onClick={() => dispatch(setInteractionType(UiInteractionType.POLYGON))}>
            <FaPencilAlt/>
            <span className={styles.Type}>{CamelCase(props.type)}</span>
        </Button>
    )
}

export default GeometryParam;
