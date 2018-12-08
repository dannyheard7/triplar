import React from "react";
import PlaceListItem from "Places/Components/PlaceListItem";

import "Places/styles/places.css";
import {Draggable} from "react-beautiful-dnd";


export default class PlaceListContainer extends React.Component {
    render() {
        return (
            <div>
                {this.props.places.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <PlaceListItem key={item.id} place={item} path={this.props.path}/>
                            </div>
                        )}
                    </Draggable>
                ))}
            </div>
        );
    }
}
