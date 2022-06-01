import React from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: React.FC<EventCalendarProps> = (props) => {
     const dateCellRender = (value: Moment) => {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(event => event.date === formatedDate);

        return (
            <ul>
                {currentDayEvents.map((event, index) =>
                    <li key={index}>{event.description}</li>
                )}
            </ul>
        )
     }

    return (
        <Calendar fullscreen={true} dateCellRender={dateCellRender}/>
    );
};

export default EventCalendar;