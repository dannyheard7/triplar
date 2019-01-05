import React from "react";
import {Link} from "react-router-dom";
import Moment from "moment";

import '../styles/trips.css';
import {getTrips} from "../utils/actions";
import { connect } from "react-redux";

export class TripList extends React.Component {
    componentDidMount() {
        this.props.dispatch(getTrips())
    }

    render() {
        return (
            <div>
                <h1>Your Trips</h1>
                <div className="trip-list">
                    {this.props.trips.map(this.createListItem)}
                </div>
            </div>
        )
    }

    createListItem(trip) {
        return (
            <div className="card trip-card" key={trip.id}>
                <h3 className="card-title"><Link to={"/trips/" + trip.id}>{trip.name}</Link></h3>
                <p className="card-text">
                    <span>{trip.locations && trip.locations.map((location, index) => (index ? ', ': '') + location.city.name)}</span><br />
                    {Moment(trip.startDate).format('Do MMMM') } - {Moment(trip.endDate).format('Do MMMM') }
                </p>
            </div>
        );
    }
}

TripList.defaultProps = {
    trips: []
};

const mapStateToProps = state => ({
  trips: state.trips.trips,
});

export default connect(mapStateToProps)(TripList)