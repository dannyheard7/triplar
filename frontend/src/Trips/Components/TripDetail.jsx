import React from "react";


export default class TripDetail extends React.Component {
    render () {
        const trip = this.props.trip;

        return (
            <div key={trip.id}>
                <div className="row">
                    <h2 id="trip-name">{trip.name}</h2>
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
