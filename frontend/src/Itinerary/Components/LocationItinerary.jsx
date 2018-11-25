import React from "react";
import Moment from 'moment';
import {daysBetweenDates} from 'Trips/utils/utils.js';
import PlacesSearchContainer from "Places/Containers/PlacesSearchContainer";
import ItineraryDayContainer from "Itinerary/Containers/ItineraryDayContainer";
import {connect} from "react-redux";
import {getItineraryDayDetail} from "../utils/actions";
import MarkerMap from "../../Maps/Components/MarkerMap";


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

    onClick() {
        this.setState({showMap: !this.state.showMap});
    }

    onChangeSelectedDay(event) {
        this.setState({selectedDate: event.target.value});
        this.componentDidMount();
    }

    render () {
        const itinerary = this.props.itinerary;
        const days = daysBetweenDates(itinerary.startDate, itinerary.endDate);

        return (
            <div className="destination-itinerary">
                <div className="destination-plan">
                    <h3 onClick={this.onClick}>{itinerary.city.name}</h3>
                    <p>{Moment(itinerary.startDate).format('dddd Do MMMM') } - {Moment(itinerary.endDate).format('dddd Do MMMM') }
                        <select onChange={this.onChangeSelectedDay}>
                            {days.map((day) => <option key={day} value={day.format("YYYY-MM-DD")}>{day.format('dddd Do MMMM')}</option>)}
                        </select>
                    </p>
                    <ItineraryDayContainer day={this.state.selectedDate} itinerary={itinerary} key={this.state.selectedDate}
                        path={`/trips/${this.props.tripId}`} />
                </div>
                {itinerary.city.location && <PlacesSearchContainer city={itinerary.city} path={`/trips/${this.props.tripId}`}/>}
            </div>
        )
    }
}

LocationItinerary.defaultProps = {
    itinerary: {
        city: {
            location: {
                lat: 0,
                lng: 0
            }
        }
    }
};

function mapStateToProps(state, ownProps) {
  return {
      itinerary: state.itineraries.locationItineraries.find(x => x.id === ownProps.location.id)
  };
}

export default connect(mapStateToProps)(LocationItinerary)
