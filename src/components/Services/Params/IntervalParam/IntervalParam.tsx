import React from "react";
import DateTimeParam from "../DateTime/DataTimeParam";
import styles from './IntervalParam.module.css';


class IntervalParam extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
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
}

export default IntervalParam;
