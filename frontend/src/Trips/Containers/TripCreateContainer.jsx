import React from "react";
import api from "Trips/utils/trips.api.js"

import TripForm from "Trips/Components/TripForm";
import FormContainer from "../../Forms/Containers/FormContainer";

export default class TripCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
        this.onClick = this.onClick.bind(this);

        this.state = {
            showTripCreate: false
        };
    }

    onSuccess(data) {
        this.setState({showTripCreate: false});
        this.props.history.push('/trips/' + data.trip.id)
    };

    onClick() {
        this.setState({showTripCreate: !this.state.showTripCreate});
    }

    render () {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.onClick}>New Trip</button>
                {this.state.showTripCreate &&
                    <div className="card">
                        <FormContainer onSuccess={this.onSuccess} apiFunction={api.createTrip}>
                            <TripForm submitLabel="Create" />
                        </FormContainer>
                    </div>
                }
            </div>
        )
    }
}