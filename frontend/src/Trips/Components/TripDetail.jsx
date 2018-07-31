import React from "react";
import Moment from 'moment';


export default class TripDetail extends React.Component {
    render () {
        const trip = this.props.trip;
        Moment.locale('en');

        return (
            <div key={trip.id}>
                <div className="row">
                    <h2 id="trip-name">{trip.name}</h2>
                    <p>{Moment(trip.start_date).format('Do MMMM') } - {Moment(trip.end_date).format('Do MMMM') }</p>
                </div>
                <div className="row">
                    <p id="created-by">Created by: {trip.created_by}</p>
                </div>
            </div>
        )
    }
}

TripDetail.defaultProps = {
    trip: null
};
