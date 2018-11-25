import React from "react";
import Moment from 'moment';
import { connect } from "react-redux";
import LoadingIndicator from "../../App/Components/LoadingIndicator";
import {Link} from "react-router-dom";
import LocationListContainer from "../../Itinerary/Containers/TripLocationListContainer";
import LocationAddContainer from "../../Itinerary/Containers/LocationAddContainer";

Moment.locale('en');

export class TripDetail extends React.Component {
    render() {
        const trip = this.props.trip;

        if (!trip) {
            return <LoadingIndicator/>;
        } else {
            if (this.props.locations) {
                trip.locations = this.props.locations;
            }

            return (
                <div id="trip-detail">
                    <h2 id="trip-name">{trip.name}</h2>
                    <p>{Moment(trip.startDate).format('Do MMMM')} - {Moment(trip.endDate).format('Do MMMM')}</p>
                    <p className="created-by">Created by: {trip.created_by}</p>
                    <p>Locations: {trip.locations.map(({city}, index) =>
                        (index ? ', ' : '') + city.name + (city.country ? ", " + city.country.name : ""))}</p>
                    <Link to={`/trips/${trip.id}/edit`}>
                        <button className="btn btn-light">Edit</button>
                    </Link>
                    <Link to={`/trips/${trip.id}/delete`}>
                        <button className="btn btn-danger">Delete Trip</button>
                    </Link>
                    <LocationListContainer tripId={trip.id}/>
                    <LocationAddContainer tripId={trip.id}/>
                </div>
            )
        }
    }
}

TripDetail.defaultProps = {
    trip: null,
    locations: null
};

function mapStateToProps(state, ownProps) {
    return {
        trip: state.trips.trips.find(x => x.id === ownProps.match.params.id),
        locations: state.itineraries.locationItineraries.filter(x => x.trip.id === ownProps.match.params.id).map(x => {
            return {city: x.city}
        })
    };
}

export default connect(mapStateToProps)(TripDetail)
