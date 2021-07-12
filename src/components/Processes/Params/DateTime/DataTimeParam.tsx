import React from "react";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

const DateTimeParam = (props: any) => {
    return (
        <Datetime onChange={(event: any) => props.setValue(event.format('YYYY-MM-DD'))}/>
    )
}

export default DateTimeParam;
