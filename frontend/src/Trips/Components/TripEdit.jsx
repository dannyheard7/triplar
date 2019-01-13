import React from "react";

import TripForm from "./TripForm";
import { connect } from "react-redux";
import {editTrip} from "../utils/actions";
import ReduxFormContainer from "../../Forms/Containers/ReduxFormContainer";

export class TripEdit extends React.Component {
    curryAction = (action, id) => (object) => action(id, object);

    render() {
        const errors = this.props.errors ? this.props.errors : [];
        let action = this.curryAction(editTrip, this.props.trip.id);

        return (
            <div className="card">
                <ReduxFormContainer action={action} >
                    <TripForm submitLabel="Save" trip={this.props.trip} fieldErrors={errors}/>
                </ReduxFormContainer>
            </div>
        );
    }
}

TripEdit.defaultProps = {
    trip: {}
};

function mapStateToProps(state, ownProps) {
  return {
      trip: state.trips.trips.find(x => x.id === ownProps.match.params.id),
      errors: state.errors.EDIT_TRIP
  };
}

export default connect(mapStateToProps)(TripEdit)