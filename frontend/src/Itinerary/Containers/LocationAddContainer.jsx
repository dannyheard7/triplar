import React from "react";
import DestinationForm from "Itinerary/Components/LocationForm";
import api from "Itinerary/utils/api.js"
import FormContainer from "Forms/Containers/FormContainer";

export default class LocationAddContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLocationAdd: false
        };

        this.onClick = this.onClick.bind(this);
        this.onSuccess = this.onSuccess.bind(this)
    }

    onClick() {
        this.setState({showLocationAdd: !this.state.showLocationAdd});
    }

    onSuccess(data) {
        this.setState({showLocationAdd: false});
        this.props.onSuccess(data.tripLocation)
    }

    apiFunc = api.curryAPIFunc(api.addLocationToTrip, this.props.tripId);

    render () {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.onClick}>Add Location</button>
                {this.state.showLocationAdd &&
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