import React from "react";
import PlaceListItem from "../Components/PlaceListItem";

import "../styles/places.css";
import {Draggable, Droppable} from "react-beautiful-dnd";

const grid = 8;
const getListStyle = isDragging => ({
    background: isDragging ? 'lightblue' : '',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
    minHeight: isDragging ? '171px' : 'auto'
});
const getDraggingOverListStyle = isDraggingOver => {
    if (isDraggingOver) return {
        background: 'orange',
    }
};


export default class DroppablePlaceListContainer extends React.Component {

    render() {
        const {path, places, droppableId, keyFunc, dragging, className} = this.props;

        const style = getListStyle(dragging);

        return (
            <Droppable droppableId={droppableId} direction="horizontal" >
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={{...style, ...getDraggingOverListStyle(snapshot.isDraggingOver)}}
                         {...provided.droppableProps} className={className}>
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
    keyFunc: (id) => id,
    dragging: false,
    className: ""
};
