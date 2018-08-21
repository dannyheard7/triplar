import React from "react";
import api from "utils/api.js";

import TripForm from "Trips/Components/TripForm.jsx";
import FormContainer from "../../Forms/Containers/FormContainer";

export default class TripEditContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
    }

    onSuccess(trip) {
        this.props.onUpdate(trip);
    };

    apiFunc = api.curryAPIFunc(api.patchTrip, this.props.trip.id);

    render() {
        return (
            <div className="card">
                <FormContainer onSuccess={this.onSuccess} apiFunction={this.apiFunc} >
                    <TripForm submitLabel="Save" trip={this.props.trip}/>
                </FormContainer>
            </div>
        );
    }
}

TripEditContainer.defaultProps = {
    trip: {}
};