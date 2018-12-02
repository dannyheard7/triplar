import React from "react";
import Moment from 'moment';
import {connect} from "react-redux";

import {daysBetweenDates} from 'Trips/utils/utils.js';
import PlacesSearchContainer from "Places/Containers/PlacesSearchContainer";
import ItineraryDayContainer from "Itinerary/Containers/ItineraryDayContainer";
import {getItineraryDayDetail} from "../utils/actions";
import {Helmet} from "react-helmet";


export class LocationItinerary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMap: false,
            selectedDate: props.itinerary.startDate,
        };

        this.onClick = this.onClick.bind(this);
        this.onChangeSelectedDay = this.onChangeSelectedDay.bind(this);
    }

    componentDidMount() {
         this.props.dispatch(getItineraryDayDetail(this.props.itinerary.id, this.state.selectedDate));
    }

    componentDidUpdate(prevProps) {
        if (this.props.itinerary.id !== prevProps.itinerary.id) {
            this.setState({
                selectedDate: this.props.itinerary.startDate
            }, this.componentDidMount);
        }
    }

    onClick() {
        this.setState({showMap: !this.state.showMap});
    }

    onChangeSelectedDay(event) {
        this.setState({selectedDate: event.target.value});
        this.componentDidMount();
    }

    render () {
        const itinerary = this.props.itinerary;
        const tripId = this.props.trip.id;
        const path = `/trips/${tripId}/itinerary/${itinerary.id}`;


        const days = daysBetweenDates(itinerary.startDate, itinerary.endDate);

        return (
            <div className="destination-itinerary">
                <Helmet>
                    <title>{this.props.trip.name + ": " + this.props.itinerary.city.name + " | Triplar"}</title>
                </Helmet>
                <div className="destination-plan">
                    <h3 onClick={this.onClick}>{itinerary.city.name}</h3>
                    <p>{Moment(itinerary.startDate).format('dddd Do MMMM') } - {Moment(itinerary.endDate).format('dddd Do MMMM') }
                        <select onChange={this.onChangeSelectedDay}>
                            {days.map((day) => <option key={day} value={day.format("YYYY-MM-DD")}>{day.format('dddd Do MMMM')}</option>)}
                        </select>
                    </p>
                    <ItineraryDayContainer day={this.state.selectedDate} itinerary={itinerary} key={this.state.selectedDate} path={path} />
                </div>
                {itinerary.city.location && <PlacesSearchContainer city={itinerary.city} path={path}/>}
            </div>
        )
    }
}

LocationItinerary.defaultProps = {
    itinerary: {city: {}}
};

function mapStateToProps(state, ownProps) {
  return {
      itinerary: state.itineraries.locationItineraries.find(x => x.id === ownProps.match.params.itineraryId),
      trip: state.trips.trips.find(x => x.id === ownProps.match.params.tripId)
  };
}

export default connect(mapStateToProps)(LocationItinerary)
