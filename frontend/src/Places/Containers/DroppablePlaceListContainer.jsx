import React from "react";
import PlaceListItem from "Places/Components/PlaceListItem";

import "Places/styles/places.css";
import {Draggable, Droppable} from "react-beautiful-dnd";

const grid = 8;
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});


export default class DroppablePlaceListContainer extends React.Component {

    render() {
        const {path, places, droppableId, keyFunc} = this.props;

        return (
            <Droppable droppableId={droppableId} direction="horizontal">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                        {places.map((item, index) => (
                            <Draggable key={keyFunc(item.id)} draggableId={keyFunc(item.id)} index={index}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <PlaceListItem key={keyFunc(item.id)} place={item} path={path}/>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

DroppablePlaceListContainer.defaultProps = {
    keyFunc: (id) => id
};
