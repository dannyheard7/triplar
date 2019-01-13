import React from "react";

export default function NonFieldErrors(props) {
    if(props.errors && props.errors.length > 0) {
        return (
            <ul bsStyle="list-unstyled">
                {props.errors.map(error => <li>{error.message}</li>)}
            </ul>
        )
    } else {
        return (null);
    }
}