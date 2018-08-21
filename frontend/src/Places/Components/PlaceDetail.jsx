import React from "react";

export default function PlaceDetail({place = []}) {
    return (
        <div className="place-detail">
            <p>
                {place.location.displayAddress}
            </p>
            <p>Rating: {place.rating}</p>
            {place.displayPhone && <p>Phone: <a href={`tel:${place.displayPhone}`}>{place.displayPhone}</a></p>}
            {place.photos && place.photos.map((image) => <img src={image} alt={place.name} height="100px" />)}
        </div>
    );
}