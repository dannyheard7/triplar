import React from "react";
import PlaceListItem from "Places/Components/PlaceListItem";

import "Places/styles/places.css";
import {ItemTypes} from 'Places/utils/constants';
import {DropTarget} from "react-dnd";


const placeListTarget = {
    canDrop(props, monitor) {
        let item = monitor.getItem();
        return props.canDrop(item);
    },

    drop(props, monitor, component) {
        let item = monitor.getItem();

        props.onDrop(item);
        return item;
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}


export class DroppablePlaceListContainer extends React.Component {
    render() {
        const {connectDropTarget, isOver, places, path, onDragRemove} = this.props;

        return connectDropTarget(
            <div className="places-list">
                {places.length === 0 && "Drop a place here" }
                {places.map((place) => <PlaceListItem key={place.id} place={place} path={path}
                                                      onDragRemove={onDragRemove}/>)}
            </div>
        );
    }
}

export default DropTarget(ItemTypes.PLACE, placeListTarget, collect)(DroppablePlaceListContainer);