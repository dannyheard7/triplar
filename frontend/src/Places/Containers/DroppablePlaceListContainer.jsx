import React from "react";
import PlaceListItem from "Places/Components/PlaceListItem";

import "Places/styles/places.css";
import {ItemTypes} from 'Places/utils/constants';
import {DropTarget} from "react-dnd";
import FlipMove from "react-flip-move";


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
    constructor(props) {
        super(props);

        this.state = {
            flipping: false
        };
    }

    render() {
        const {connectDropTarget, isOver, places, path, onDragRemove} = this.props;

        return connectDropTarget(
            <div >
                {places.length === 0 && "Drop a place here" }
                <FlipMove  duration={100}
                    easing="ease-out"
                    className="places-list"
                    onStart={() => this.setState({flipping: true})}
                    onFinish={() => this.setState({flipping: false})}>
                    {places.map((place) => <PlaceListItem key={place.id} place={place} path={path}
                                                      onDragRemove={onDragRemove}/>)}
                </FlipMove>
            </div>
        );
    }
}

export default DropTarget(ItemTypes.PLACE, placeListTarget, collect)(DroppablePlaceListContainer);