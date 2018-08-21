import React from "react";
import api from "Trips/utils/trips.api.js";

import TripForm from "Trips/Components/TripForm.jsx";
import FormContainer from "Forms/Containers/FormContainer";

export default class TripEditContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
    }

    onSuccess(data) {
        this.props.onUpdate(data.trip);
    };

    apiFunc = api.curryAPIFunc(api.editTrip, this.props.trip.id);

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