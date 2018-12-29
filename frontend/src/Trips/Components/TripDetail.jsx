import React from "react";
import Moment from 'moment';
import {connect} from "react-redux";
import LoadingIndicator from "../../App/Components/LoadingIndicator";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {getTrips} from "../utils/actions";

Moment.locale('en');

export class TripDetail extends React.Component {
    componentDidMount() {
        if(!this.props.trip) {
            // TODO: get trip detail
            this.props.dispatch(getTrips());
        }
    }

    render() {
        const trip = this.props.trip;

        if (!trip) {
            return <LoadingIndicator/>;
        } else {
            return (
                <div id="trip-detail">
                    <Helmet>
                        <title>{this.props.trip.name + " | Triplar"}</title>
                    </Helmet>
                    <h1 id="trip-name">{trip.name}</h1>
                    <p>{Moment(trip.startDate).format('Do MMMM')} - {Moment(trip.endDate).format('Do MMMM')}</p>
                    {trip.createdBy && <p className="created-by">Created by: {trip.createdBy.firstName} {trip.createdBy.lastName}</p>}
                    <Link to={`/trips/${trip.id}/edit`}>
                        <button className="btn btn-light">Edit</button>
                    </Link>
                    <Link to={`/trips/${trip.id}/delete`}>
                        <button className="btn btn-danger">Delete Trip</button>
                    </Link>
                </div>
            )
        }
    }
}

TripDetail.defaultProps = {
    trip: null,
};

function mapStateToProps(state, ownProps) {
    return {
        trip: state.trips.trips.find(x => x.id === ownProps.match.params.id),
    };
}

export default connect(mapStateToProps)(TripDetail)
