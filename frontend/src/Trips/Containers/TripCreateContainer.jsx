import React from "react";

import TripForm from "Trips/Components/TripForm";
import ReduxFormContainer from "../../Forms/Containers/ReduxFormContainer";
import {connect} from "react-redux";
import {createTrip} from "../utils/actions";

export class TripCreateContainer extends React.Component {
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
                        <ReduxFormContainer errors={this.props.errors} action={createTrip}>
                            <TripForm submitLabel="Create" />
                        </ReduxFormContainer>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {return {errors: state.trips.errors}};
export default connect(mapStateToProps)(TripCreateContainer)