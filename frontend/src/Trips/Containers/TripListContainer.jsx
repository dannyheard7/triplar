import React from "react";

import TripList from "Trips/Components/TripList";
import {connect} from "react-redux";
import {getTrips} from "../utils/actions";

export class TripListContainer extends React.Component {
    componentDidMount() {
        this.props.dispatch(getTrips())
    }

    render() {
        return (<TripList trips={this.props.trips}/>);
    }
}

const mapStateToProps = state => ({
  trips: state.trips.trips,
});

export default connect(mapStateToProps)(TripListContainer)