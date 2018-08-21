import React from "react";
import ItineraryDay from "Itinerary/Components/ItineraryDay";
import DroppablePlaceListContainer from "Places/Containers/DroppablePlaceListContainer";

import api from "Itinerary/utils/api";

export default class ItineraryDayContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            places: []
        };

        this.getItinerary = this.getItinerary.bind(this);
        this.canDrop = this.canDrop.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragRemove = this.onDragRemove.bind(this);
    }

    componentDidMount() {
        this.getItinerary();
    }

    getItinerary() {
        api.getLocationDayItinerary(this.props.location.id, this.props.day).then(({data}) => {
            let places = data.data.locationDayItinerary.map(x => x['place']);
            this.setState({places: places});
        });

    }

    canDrop(item) {
        return (this.state.places.indexOf(item) === -1)
    }

    onDrop(item) {
        let places = this.state.places.concat(item);
        this.setState({places: places});

        api.addItemToTripLocation(this.props.location.id, item.id, this.props.day, this.state.places.length);
    }

    onDragRemove(item) {
        let places = this.state.places;
        let index = places.indexOf(item);

        if (index !== -1) {
            places.splice(index, 1);
            this.setState({places: places});
        }
    }

    render () {
        return (
            <div>
                <ItineraryDay day={this.props.day}/>
                <DroppablePlaceListContainer places={this.state.places} path={"/"} canDrop={this.canDrop} onDrop={this.onDrop}
                                             onDragRemove={this.onDragRemove}/>
            </div>
        );
    }
}


