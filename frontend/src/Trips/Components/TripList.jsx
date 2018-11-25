import React from "react";
import {Link} from "react-router-dom";
import Moment from "moment";

import 'Trips/styles/trips.css';

export default class TripList extends React.Component {
    render() {
        return (
            <div className="trip-list">
                {this.props.trips.map(this.createListItem)}
            </div>
        )
    }

    createListItem(trip) {
        return (
            <div className="card trip-card" key={trip.id}>
                <h3 className="card-title"><Link to={"/trips/" + trip.id}>{trip.name}</Link></h3>
                <p className="card-text">
                    <span>{trip.locations && trip.locations.map((location, index) => (index ? ', ': '') + location.city.name)}</span><br />
                    {Moment(trip.startDate).format('Do MMMM') } - {Moment(trip.endDate).format('Do MMMM') }
                </p>
            </div>
        );
    }
}

TripList.defaultProps = {
    trips: []
};