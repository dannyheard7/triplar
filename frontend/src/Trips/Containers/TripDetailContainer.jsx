import React from "react";

import TripDetail from "Trips/Components/TripDetail";
import {Link} from "react-router-dom";
import LoadingIndicator from "App/Components/LoadingIndicator";
import {connect} from "react-redux";
import LocationListContainer from "../../Itinerary/Containers/TripLocationListContainer";
import LocationAddContainer from "../../Itinerary/Containers/LocationAddContainer";

export class TripDetailContainer extends React.Component {
    render() {
        const trip = this.props.trip;

        if (!trip) {
            return <LoadingIndicator />;
        } else {
            if(this.props.locations) {
                trip.locations = this.props.locations;
            }

            return (
                <div>
                    <TripDetail trip={trip}/>
                    <Link to={`/trips/${trip.id}/edit`}><button className="btn btn-light">Edit</button></Link>
                    <Link to={`/trips/${trip.id}/delete`}><button className="btn btn-danger">Delete Trip</button></Link>
                    <LocationListContainer tripId={trip.id}/>
                    <LocationAddContainer tripId={trip.id} />
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
  return {
      trip: state.trips.trips.find(x => x.id === ownProps.match.params.id),
      locations: state.itineraries.locationItineraries.filter(x => x.trip.id === ownProps.match.params.id).map(x => { return {city: x.city} })
  };
}

export default connect(mapStateToProps)(TripDetailContainer)