import React from "react";
import Moment from 'moment';
import { daysBetweenDates } from 'utils/utils.js';

import CityMap from "Maps/Components/CityMap";


export default class DestinationItinerary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMap: false,
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({showMap: !this.state.showMap});
    }

    renderItineraryDay(day) {
        return (
            <p key={day}>{day}</p>
        );
    }

    render () {
        const itinerary = this.props.itinerary;
        const start_date = Moment(itinerary.start_date);
        const end_date = Moment(itinerary.end_date);

        const days = daysBetweenDates(start_date, end_date).map(this.renderItineraryDay);

        return (
            <div>
                <div className="row">
                    <h3 onClick={this.onClick} style={{cursor: "pointer", color: "blue"}}>{itinerary.city.name_std}</h3>
                    <p>{start_date.format('dddd Do MMMM') } - {end_date.format('dddd Do MMMM') }</p>
                </div>
                {this.state.showMap && <CityMap city={itinerary.city} /> }
                {days}
            </div>
        )
    }
}

DestinationItinerary.defaultProps = {
    itinerary: {}
};
