import React from "react";
import LocationForm from "./LocationForm";
import ReduxFormContainer from "../../Forms/Containers/ReduxFormContainer";
import {addLocationToTrip} from "../utils/actions";
import {connect} from "react-redux";

export class LocationAdd extends React.Component {
    curryAction = (action, id) => (object) => action(id, object);

    render () {
        return (
            <ReduxFormContainer action={this.curryAction(addLocationToTrip, this.props.trip.id)} errors={this.props.errors} >
                <LocationForm submitLabel="Add" location={this.props.trip}/>
            </ReduxFormContainer>
        )
    }
}

const mapStateToProps = (state) => {return {errors: state.itineraries.errors}};
export default connect(mapStateToProps)(LocationAdd)