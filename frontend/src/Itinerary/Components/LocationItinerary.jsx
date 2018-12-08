import React from "react";
import Moment from 'moment';
import {connect} from "react-redux";

import {daysBetweenDates} from 'Trips/utils/utils.js';
import PlacesSearchContainer from "Places/Containers/PlacesSearchContainer";
import ItineraryDayContainer from "Itinerary/Containers/ItineraryDayContainer";
import {addItemToItineraryDay, getItineraryDayDetail, removeItemFromItineraryDay} from "../utils/actions";
import {Helmet} from "react-helmet";
import {DragDropContext} from "react-beautiful-dnd";


export class LocationItinerary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: props.itinerary.startDate,
        };

        this.onChangeSelectedDay = this.onChangeSelectedDay.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getItineraryDayDetail(this.props.itinerary.id, this.state.selectedDate));
    }

    componentDidUpdate(prevProps) {
        if (this.props.itinerary.id !== prevProps.itinerary.id) {
            this.setState({selectedDate: this.props.itinerary.startDate}, this.componentDidMount);
        }
    }

    onChangeSelectedDay(event) {
        this.setState({selectedDate: event.target.value}, this.componentDidMount);
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.destination === result.source) {
            //  reorder
            //     result.source.index,
            //     result.destination.index
            // ;
            return;
        }

        const placeId = result.draggableId;
        const selectedDate = this.state.selectedDate;

        if (result.destination.droppableId === "placeSearchContainer") {
            this.props.dispatch(removeItemFromItineraryDay(this.props.itinerary.id, placeId, selectedDate));
        } else {
            if (!this.props.itineraryItems.filter(x => x.date === selectedDate).map(x => x.place).includes(placeId)) {
                this.props.dispatch(addItemToItineraryDay(this.props.itinerary.id, placeId, selectedDate, result.destination.index));
            }
        }
    }

    render() {
        const itinerary = this.props.itinerary;
        const tripId = this.props.trip.id;
        const path = `/trips/${tripId}/itinerary/${itinerary.id}`;


        const days = daysBetweenDates(itinerary.startDate, itinerary.endDate);

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="destination-itinerary">
                    <Helmet>
                        <title>{this.props.trip.name + ": " + this.props.itinerary.city.name + " | Triplar"}</title>
                    </Helmet>
                    <div className="destination-plan">
                        <h3>{itinerary.city.name}</h3>
                        <p>{Moment(itinerary.startDate).format('dddd Do MMMM')} - {Moment(itinerary.endDate).format('dddd Do MMMM')}
                            <select onChange={this.onChangeSelectedDay}>
                                {days.map((day) => <option key={day}
                                                           value={day.format("YYYY-MM-DD")}>{day.format('dddd Do MMMM')}</option>)}
                            </select>
                        </p>
                        <ItineraryDayContainer day={this.state.selectedDate} itinerary={itinerary}
                                               key={this.state.selectedDate} path={path}/>
                    </div>
                    {itinerary.city.location && <PlacesSearchContainer city={itinerary.city} path={path}/>}
                </div>
            </DragDropContext>
        )
    }
}

LocationItinerary.defaultProps = {
    itinerary: {city: {}}
};

function mapStateToProps(state, ownProps) {
    const itineraryId = ownProps.match.params.itineraryId;
    return {
        itineraryItems: state.itineraries.itineraryItems.filter(x => x.itineraryId === itineraryId),
        itinerary: state.itineraries.locationItineraries.find(x => x.id === itineraryId),
        trip: state.trips.trips.find(x => x.id === ownProps.match.params.tripId)
    };
}

export default connect(mapStateToProps)(LocationItinerary)
