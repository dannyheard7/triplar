import React from "react";
import Moment from 'moment';


export default class TripDetail extends React.Component {
    render () {
        const trip = this.props.trip;
        Moment.locale('en');

        return (
            <div id="trip-detail">
                <h2 id="trip-name">{trip.name}</h2>
                <p>{Moment(trip.startDate).format('Do MMMM') } - {Moment(trip.endDate).format('Do MMMM') }</p>
                <p className="created-by">Created by: {trip.created_by}</p>
                <p>Locations: {trip.locations.map(({city}, index) =>
                    (index ? ', ' : '') + city.name + (city.country ? ", " + city.country.name : ""))}</p>
            </div>
        )
    }
}

TripDetail.defaultProps = {
    trip: null
};
