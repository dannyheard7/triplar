import React from "react";
import DestinationForm from "Trips/Components/DestinationForm";
import api from "utils/api.js"
import FormContainer from "Forms/Containers/FormContainer";

export default class DestinationAddContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDestinationAdd: false
        };

        this.onClick = this.onClick.bind(this);
        this.onSuccess = this.onSuccess.bind(this)
    }

    onClick() {
        this.setState({showDestinationAdd: !this.state.showDestinationAdd});
    }

    onSuccess(itinerary) {
        this.setState({showDestinationAdd: false});
        this.props.onSuccess(itinerary)
    }

    apiFunc = api.curryAPIFunc(api.addDestinationToTrip, this.props.tripId);

    render () {
        return (
            <div>
                <div className="row">
                    <div className="col md-2">
                        <button className="btn btn-primary" onClick={this.onClick}>Add Destination</button>
                    </div>
                </div>
                {this.state.showDestinationAdd &&
                    <div className="card">
                        <FormContainer onSuccess={this.onSuccess} apiFunction={this.apiFunc}>
                            <DestinationForm submitLabel="Add"/>
                        </FormContainer>
                    </div>
                }
            </div>
        )
    }
}