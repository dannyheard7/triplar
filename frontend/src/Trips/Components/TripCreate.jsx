import React from "react";

import TripForm from "./TripForm";
import ReduxFormContainer from "../../Forms/Containers/ReduxFormContainer";
import {connect} from "react-redux";
import {createTrip} from "../utils/actions";

export class TripCreate extends React.Component {
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
        const errors = this.props.errors ? this.props.errors : [];

        return (
            <div>
                <button className="btn btn-primary" onClick={this.onClick}>New Trip</button>
                {this.state.showTripCreate &&
                    <div className="card">
                        <ReduxFormContainer fieldErrors={errors} action={createTrip}>
                            <TripForm submitLabel="Create" />
                        </ReduxFormContainer>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) =>  ({
    errors: state.errors.CREATE_TRIP
});
export default connect(mapStateToProps)(TripCreate)