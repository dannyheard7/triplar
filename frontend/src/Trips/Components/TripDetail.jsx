import React from "react";
import Moment from 'moment';
import ItineraryListContainer from "../Containers/ItineraryListContainer";

// TODO: Move ItineraryListContainer somewhere else!

export default class TripDetail extends React.Component {
    render () {
        const trip = this.props.trip;
        Moment.locale('en');

        return (
            <div key={trip.id}>
                <div className="row">
                    <h2 id="trip-name">{trip.name}</h2>
                </div>
                <div className="row">
                    <p>{Moment(trip.start_date).format('Do MMMM') } - {Moment(trip.end_date).format('Do MMMM') }</p>
                </div>
                <div className="row">
                    <p id="created-by">Created by: {trip.created_by}</p>
                </div>
                <div className="row">
                    <p>Locations: {trip.itineraries.map((itinerary, index) => (index ? ', ': '') + itinerary.city.name_std + ", "
                        + itinerary.city.country)}</p>
                </div>
                <ItineraryListContainer itineraries={trip.itineraries} tripId={trip.id}/>
            </div>
        )
    }
}

TripDetail.defaultProps = {
    trip: null
};
