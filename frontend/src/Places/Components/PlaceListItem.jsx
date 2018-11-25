import React from "react";
import {Link} from "react-router-dom";
import {DragSource} from 'react-dnd';
import {ItemTypes} from "Places/utils/constants";


const placeSource = {
    beginDrag(props) {
        return props.place;
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        const item = monitor.getItem();
        const result = monitor.getDropResult();
        delete result.dropEffect;

        // Check if the drop result is the same as the item, as there may be no need to remove the item
        if(item === result) {
            props.onDragRemove(item);
        }
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


export function PlaceListItem(props) {
    const {connectDragSource, place} = props;

    return connectDragSource(
        <div className="place card">
            <Link to={`${props.path}/place/${place.id}`}>
                <p>{place.name}</p>
            </Link>
            <img src={place.imageUrl} alt={place.name} height="100px"/>
        </div>
    );
}

export default DragSource(ItemTypes.PLACE, placeSource, collect)(PlaceListItem);