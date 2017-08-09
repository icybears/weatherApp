import React from 'react';

const DaysView = (props) => {
    return (
        <div className="day-view">
            <div>{props.day} - {props.hour}</div>
            <div>{props.short_desc}</div>
            <div>
                {props.temp}&nbsp;<span>°C</span>
            </div>
            <div></div>
            <div></div>
        </div>
    );
};

export default DaysView;