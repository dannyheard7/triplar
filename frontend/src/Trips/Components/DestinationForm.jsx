import React from "react";
import NonFieldErrors from "Forms/Components/NonFieldErrors";
import CitySearchFieldContainer from "Forms/Containers/CitySearchFieldContainer";
import DateFieldGroup from "Forms/Components/DateFieldGroup";


export default function DestinationForm(props) {
     const itinerary = (props.itinerary) ? props.itinerary : {};
     let location = (typeof itinerary.city !== 'undefined') ? itinerary.city.name_std + ", " + itinerary.city.country : "";

    return (
        <form onSubmit={props.onSubmit}>
            <NonFieldErrors errors={props.errors.non_field_errors}/>
            <CitySearchFieldContainer errors={props.errors.locations} value={location} name="city"/>
            <DateFieldGroup errors={props.errors.start_date} label="Arrival" name="start_date"
                            value={itinerary.start_date} required="true"/>
            <DateFieldGroup errors={props.errors.end_date} label="Departure" name="end_date"
                           value={itinerary.end_date} required="true"/>
            <button type="submit" className="btn btn-primary">{props.submitLabel}</button>
        </form>
    );
}
