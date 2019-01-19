import React from "react";
import LocationForm from "./LocationForm";
import ReduxFormContainer from "../../Forms/Containers/ReduxFormContainer";
import {addTripLocation} from "../utils/actions";
import {connect} from "react-redux";

export class LocationAdd extends React.Component {
    curryAction = (action, id) => (object) => action(id, object);

    render () {
        const errors = this.props.errors ? this.props.errors : [];

        const location = {arrivalDate: this.props.trip.startDate, department: this.props.trip.endDate};

        return (
            <ReduxFormContainer action={this.curryAction(addTripLocation, this.props.trip.id)} fieldErrors={errors} >
                <LocationForm submitLabel="Add" location={location}/>
            </ReduxFormContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors.ADD_TRIP_LOCATION
});
export default connect(mapStateToProps)(LocationAdd)