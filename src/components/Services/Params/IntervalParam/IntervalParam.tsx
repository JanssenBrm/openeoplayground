import React from "react";
import DateTimeParam from "../DateTime/DataTimeParam";
import styles from './IntervalParam.module.css';


const IntervalParam = (props: any) => {
    return (
        <div className={styles.IntervalContainer}>
            <div className={styles.DateSelector}>
                <DateTimeParam></DateTimeParam>
            </div>
            <div className={styles.DateSelector}>
                <DateTimeParam></DateTimeParam>
            </div>

        </div>
    )
}

export default IntervalParam;
