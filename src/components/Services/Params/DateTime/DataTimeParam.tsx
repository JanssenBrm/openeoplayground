import React from "react";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

class DateTimeParam extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Datetime />
        )
    }
}

export default DateTimeParam;
