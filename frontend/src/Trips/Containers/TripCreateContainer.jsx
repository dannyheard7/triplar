import React from "react";
import api from "utils/api.js"

import TripFormContainer from "./TripFormContainer.jsx";

export default class TripCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
    }

    onSuccess(trip) {
        this.props.onTripCreate(trip);
    };

    render () {
        return (
            <div className="card">
                <TripFormContainer submitLabel="Create" onSuccess={this.onSuccess} apiFunction={api.createTrip} />
            </div>
        )
    }
}