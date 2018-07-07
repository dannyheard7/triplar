import React from "react";
import {Link} from "react-router-dom";

export default class TripList extends React.Component {
    render() {
        return (
            <div className="panel" header="Your Trips">
                <ul className="list-unstyled">
                    {this.props.trips.map(this.createListItem)}
                </ul>
            </div>
        )
    }

    createListItem(trip) {
        return (
            <li key={trip.id}>
                <Link to={"/trips/" + trip.id}>{trip.name}</Link>
            </li>
        );
    }
}

TripList.defaultProps = {
    trips: []
};