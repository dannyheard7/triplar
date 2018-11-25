import React from "react";
import {connect} from "react-redux";
import LocationItinerary from "./LocationItinerary";
import {getTripItineraries} from "../utils/actions";
import {Link} from "react-router-dom";


export class ItinerariesOverview extends React.Component {
    componentDidMount() {
        this.props.dispatch(getTripItineraries(this.props.match.params.id));
    }

    render() {
        const trip = this.props.trip;
        const locations = this.props.locations;

        return (
            <div className="itineraries-overview">
                <div className="locations">
                    {locations.map((location) =>
                        <Link to={`/trips/${trip.id}/itinerary/${location.id}`}>
                        <p>{location.city.name}, {location.city.country.name}</p>
                        </Link>
                    )}
                </div>
            </div>
        )
    }
}

ItinerariesOverview.defaultProps = {
    trip: {},
    locations: []
};

function mapStateToProps(state, ownProps) {
    return {
        trip: state.trips.trips.find(x => x.id === ownProps.match.params.id),
        locations: state.itineraries.locationItineraries.filter(x => x.trip.id === ownProps.match.params.id)
    };
}

export default connect(mapStateToProps)(ItinerariesOverview)
