import React from "react";
import PlaceListItem from "Places/Components/PlaceListItem";

import "Places/styles/places.css";


export default class PlaceListContainer extends React.Component {
    render() {
        return (
            <div className="places-list">
                { this.props.places.map((place) => <PlaceListItem key={place.id} place={place} path={this.props.path}
                                                    onDragRemove={() => {}}/>) }
            </div>
        );
    }
}
