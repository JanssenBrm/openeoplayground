import React, { useEffect } from "react";
import {Button} from "react-bootstrap";
import "react-datetime/css/react-datetime.css";
import {FaPencilAlt, FaTimes} from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import {CamelCase} from "../../../../services/Utils.t";
import { AppStore } from "../../../../stores/app.model";
import { setFeature } from "../../../../stores/params";
import {setInteractionType } from "../../../../stores/ui";
import { UiInteractionType } from "../../../../stores/ui/ui.model";
import styles from './GeometryParam.module.css';
import { GeometryParamProps } from "./GeometryParamProps";



const GeometryParam = (props: GeometryParamProps) => {
    const feature: any = useSelector((state: AppStore) => state.params.feature)
    const dispatch = useDispatch()

    useEffect(() => {
        props.setValue(feature);
    }, [feature, props]);

    return (
        <div className={styles.GeomParam}>
            {
                feature ? (
                    <div className={styles.Geom}>
                        <FaTimes className={styles.Icon} onClick={() => dispatch(setFeature(undefined))}/>
                        {CamelCase(feature.type)}
                    </div>
                ) : ''
            }
            <Button onClick={() => dispatch(setInteractionType(UiInteractionType.POLYGON))} disabled={!!feature} >
                <FaPencilAlt className={styles.Icon}/>
                <span className={styles.Type}>{CamelCase(props.type)}</span>
            </Button>
        </div>

    )
}

export default GeometryParam;
