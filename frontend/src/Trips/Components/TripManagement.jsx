import React from "react";
import {Link} from "react-router-dom";

export default function TripManagement(props) {
    let tripId = props.trip.id;

    return (
        <div className="trip-management">
            <Link to={`/trips/${tripId}/edit`}><button className="btn btn-light">Edit</button></Link>
            <Link to={`/trips/${tripId}/delete`}><button className="btn btn-danger">Delete Trip</button></Link>
        </div>
    )
}
