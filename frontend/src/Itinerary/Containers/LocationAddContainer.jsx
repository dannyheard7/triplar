import React from "react";
import LocationForm from "Itinerary/Components/LocationForm";
import ReduxFormContainer from "../../Forms/Containers/ReduxFormContainer";
import {addLocationToTrip} from "../utils/actions";

export default class LocationAddContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLocationAdd: false
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({showLocationAdd: !this.state.showLocationAdd});
    }

    curryAction = (action, id) => (object) => action(id, object);

    render () {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.onClick}>Add Location</button>
                {this.state.showLocationAdd &&
                    <div className="card">
                        <ReduxFormContainer action={this.curryAction(addLocationToTrip, this.props.tripId)}>
                            <LocationForm submitLabel="Add"/>
                        </ReduxFormContainer>
                    </div>
                }
            </div>
        )
    }
}