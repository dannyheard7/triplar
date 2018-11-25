import React from "react";
import LocationItinerary from "../Components/LocationItinerary";

import "../../Trips/styles/trips.css"
import {connect} from "react-redux";
import {getTripItineraries} from "../../Itinerary/utils/actions";

export class TripLocationListContainer extends React.Component {
    componentDidMount() {
        this.props.dispatch(getTripItineraries(this.props.tripId));
    }

    render() {
        return (
            <div id="trip-itineraries">
                {this.props.locations.map((location) =>
                    <LocationItinerary key={location.id} location={location} tripId={this.props.tripId}/>
                )}
            </div>
        );
    }
}

TripLocationListContainer.defaultProps = {
    locations: []
};

function mapStateToProps(state, ownProps) {
  return {
      locations: state.itineraries.locationItineraries.filter(x => x.trip.id === ownProps.tripId)
  };
}

export default connect(mapStateToProps)(TripLocationListContainer)