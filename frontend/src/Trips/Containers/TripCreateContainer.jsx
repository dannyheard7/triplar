import React from "react";
import api from "utils/api.js"
import {withRouter} from "react-router-dom";

import TripForm from "Trips/Components/TripForm";
import FormContainer from "../../Forms/Containers/FormContainer";

export class TripCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
        this.onClick = this.onClick.bind(this);

        this.state = {
            showTripCreate: false
        };
    }

    onSuccess(trip) {
        this.setState({showTripCreate: false});
        this.props.history.push('/trips/' + trip.id)
    };

    onClick() {
        this.setState({showTripCreate: !this.state.showTripCreate});
    }

    render () {
        return (
            <div>
                <div className="row">
                    <div className="col md-2">
                        <button className="btn btn-primary" onClick={this.onClick}>New Trip</button>
                    </div>
                </div>
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

export default withRouter(TripCreateContainer)