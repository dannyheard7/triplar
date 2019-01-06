import React from "react";
import Moment from 'moment';
import {connect} from "react-redux";

import {daysBetweenDates} from '../utils/utils.js';
import PlacesSearchContainer from "../../Places/Containers/PlacesSearchContainer";
import ItineraryDayContainer from "./ItineraryDayContainer";
import {addItemToItineraryDay, getItineraryDayDetail, removeItemFromItineraryDay} from "../utils/actions";
import {Helmet} from "react-helmet";
import {DragDropContext} from "react-beautiful-dnd";


export class LocationItinerary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: props.itinerary.startDate,
            dragging: false,
        };

        this.onChangeSelectedDay = this.onChangeSelectedDay.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
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
        this.setState({dragging: false});
        if (!result.destination) return;

        const itineraryId = this.props.itinerary.id;
        let placeId = result.draggableId;
        if(result.source.droppableId === "itinerary-day-droppable") {
            placeId = result.draggableId.slice(0, -itineraryId.toString().length);
        }

        if (result.destination.droppableId === result.source.droppableId) {
            //  reorder
            return;
        }

        const selectedDate = Moment(this.state.selectedDate).format("YYYY-MM-DDz");

        if (result.destination.droppableId === "placeSearchContainer") {
            this.props.dispatch(removeItemFromItineraryDay(itineraryId, placeId, selectedDate));
        } else if (!this.props.itineraryItems.filter(x => x.date === selectedDate).map(x => x.place).includes(placeId)) {
            this.props.dispatch(addItemToItineraryDay(itineraryId, placeId, selectedDate, result.destination.index));
        }
    }

    onDragStart() {
        this.setState({dragging: true});
    }

    render() {
        const {trip, itinerary} = this.props;
        const tripId = trip ? trip.id : this.props.match.params.tripId;
        const path = `/trips/${tripId}/itinerary/${itinerary.id}`;

        const days = daysBetweenDates(itinerary.startDate, itinerary.endDate);

        return (
            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                <div>
                    <Helmet>
                        <title>{trip.name + ": " + itinerary.city.name + " | Triplar"}</title>
                    </Helmet>
                    <div>
                        <div className="row">
                            <h3>{itinerary.city.name}</h3>
                            <select onChange={this.onChangeSelectedDay}>
                                {days.map((day) =>
                                    <option key={day} value={day.format("YYYY-MM-DD")}>{day.format('dddd Do MMMM')}</option>
                                )}
                            </select>
                        </div>
                        <ItineraryDayContainer day={this.state.selectedDate} itinerary={itinerary} key={this.state.selectedDate}
                                               path={path} dragging={this.state.dragging}/>
                    </div>
                    <PlacesSearchContainer city={itinerary.city} path={path}/>
                </div>
            </DragDropContext>
        )
    }
}

LocationItinerary.defaultProps = {
    itinerary: {city: {}},
    trip: {}
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
