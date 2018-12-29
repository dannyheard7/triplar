import React from "react";
import {Link} from "react-router-dom";

export default function PlaceListItem(props) {
    const  {place} = props;

    return (
        <div className="place card">
            <Link to={`${props.path}/place/${place.id}`}>
                <p>{place.name}</p>
            </Link>
            {place.photos && place.photos.length > 0 && <img src={place.photos[0]} alt={place.name} height="100px"/> }
        </div>
    );
}
