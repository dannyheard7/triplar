import React from "react";

import TripForm from "Trips/Components/TripForm.jsx";
import { connect } from "react-redux";
import {editTrip} from "../utils/actions";
import ReduxFormContainer from "../../Forms/Containers/ReduxFormContainer";

export class TripEditContainer extends React.Component {
    curryAction = (action, id) => (object) => action(id, object);

    render() {
        let action = this.curryAction(editTrip, this.props.trip.id);

        return (
            <div className="card">
                <ReduxFormContainer action={action} >
                    <TripForm submitLabel="Save" trip={this.props.trip}/>
                </ReduxFormContainer>
            </div>
        );
    }
}

TripEditContainer.defaultProps = {
    trip: {}
};

function mapStateToProps(state, ownProps) {
  return {
      trip: state.trips.trips.find(x => x.id === ownProps.match.params.id)
  };
}

export default connect(mapStateToProps)(TripEditContainer)