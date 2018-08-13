import React from "react";
import {Link} from "react-router-dom";
import Moment from "moment";

export default class TripList extends React.Component {
    render() {
        return (
            <div className="row" id="trip-list">
                {this.props.trips.map(this.createListItem)}
            </div>
        )
    }

    createListItem(trip) {
        return (
            <div className="col-sm-4" key={trip.id}>
                <div className="card trip-card">
                    <h3 className="card-title"><Link to={"/trips/" + trip.id}>{trip.name}</Link></h3>
                    <p className="card-text">
                        <span>{trip.locations.map((location, index) => (index ? ', ': '') + location)}</span><br />
                        {Moment(trip.start_date).format('Do MMMM') } - {Moment(trip.end_date).format('Do MMMM') }
                    </p>
                </div>
            </div>
        );
    }
}

TripList.defaultProps = {
    trips: []
};