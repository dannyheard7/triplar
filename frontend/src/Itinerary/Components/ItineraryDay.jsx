import React from "react";
import Moment from 'moment';

export default function ItineraryDay({day}) {
    day = Moment(day);

    return (
        <p>
            {day.format("dddd Do MMMM")}
        </p>
    );
}
