import React from "react";
import api from "utils/api.js";

import TripFormContainer from "./TripFormContainer.jsx";

export default class TripEditContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
    }

    onSuccess(trip) {
        this.props.onUpdate(trip);
    };

    render() {
        return (
            <div className="card">
                <TripFormContainer submitLabel="Update" onSuccess={this.onSuccess} apiFunction={api.patchTrip}
                    trip={this.props.trip}/>
            </div>
        );
    }
}

TripEditContainer.defaultProps = {
    trip: {}
};