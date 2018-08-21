import React from "react";
import NonFieldErrors from "Forms/Components/NonFieldErrors";
import CitySearchFieldContainer from "Forms/Containers/CitySearchFieldContainer";
import DateFieldGroup from "Forms/Components/DateFieldGroup";


export default function DestinationForm(props) {
     const itinerary = (props.location) ? props.location : {};
     let location = (typeof itinerary.city !== 'undefined') ? itinerary.city.name_std + ", " + itinerary.city.country : "";

    return (
        <form onSubmit={props.onSubmit}>
            <NonFieldErrors errors={props.errors.non_field_errors}/>
            <CitySearchFieldContainer errors={props.errors.locations} value={location} name="city"/>
            <DateFieldGroup errors={props.errors.startDate} label="Arrival" name="startDate"
                            value={itinerary.startDate} required={true}/>
            <DateFieldGroup errors={props.errors.endDate} label="Departure" name="endDate"
                           value={itinerary.endDate} required={true}/>
            <button type="submit" className="btn btn-primary">{props.submitLabel}</button>
        </form>
    );
}
