import React from "react";
import Moment from 'moment';
import {daysBetweenDates} from 'Itinerary/utils/utils.js';

import CityMap from "Maps/Components/CityMap";
import PlacesSearchContainer from "Places/Containers/PlacesSearchContainer";
import ItineraryDayContainer from "Itinerary/Containers/ItineraryDayContainer";


export default class LocationItinerary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMap: false,
            location: props.location,
            selectedDate: props.location.startDate,
            days: []
        };

        Moment.locale('en');

        this.state.location.startDate = Moment(this.state.location.startDate);
        this.state.location.endDate = Moment(this.state.location.endDate);
        this.state.days = daysBetweenDates(this.state.location.startDate, this.state.location.endDate);

        this.onClick = this.onClick.bind(this);
        this.onChangeSelectedDay = this.onChangeSelectedDay.bind(this);
    }

    onClick() {
        this.setState({showMap: !this.state.showMap});
    }

    onChangeSelectedDay(event) {
        this.setState({selectedDate: event.target.value})
    }

    render () {
        const location = this.state.location;
        const days = this.state.days;

        return (
            <div className="destination-itinerary">
                <div className="destination-plan">
                    <h3 onClick={this.onClick}>{location.city.name}</h3>
                    <p>{location.startDate.format('dddd Do MMMM') } - {location.endDate.format('dddd Do MMMM') }
                        <select onChange={this.onChangeSelectedDay}>
                            {days.map((day) => <option key={day} value={day.format("YYYY-MM-DD")}>{day.format('dddd Do MMMM')}</option>)}
                        </select>
                    </p>
                    {this.state.showMap && <CityMap city={location.city} /> }
                    <ItineraryDayContainer day={this.state.selectedDate} location={location} key={this.state.selectedDate}/>
                </div>
                <PlacesSearchContainer city={location.city} path={`/trips/${location.trip.id}`} />
            </div>
        )
    }
}

LocationItinerary.defaultProps = {
    location: {}
};
