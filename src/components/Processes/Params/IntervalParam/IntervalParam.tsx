import React, {useEffect, useState } from "react";
import DateTimeParam from "../DateTime/DataTimeParam";
import styles from './IntervalParam.module.css';


const IntervalParam = (props: any) => {
    const [interval, setInterval] = useState([undefined, undefined])

    useEffect(() => {
       if (interval[0] && interval[1]) {
           props.setValue(interval);
       }
    }, [interval, props]);

    return (
        <div className={styles.IntervalContainer}>
            <div className={styles.DateSelector}>
                <DateTimeParam value={props.value? props.value[0] : undefined} setValue={(event: any) => setInterval([event, interval[1]])}></DateTimeParam>
            </div>
            <div className={styles.DateSelector}>
                <DateTimeParam value={props.value? props.value[1] : undefined}  setValue={(event: any) => setInterval([interval[0], event])}></DateTimeParam>
            </div>

        </div>
    )
}

export default IntervalParam;
