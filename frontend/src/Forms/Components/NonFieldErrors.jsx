import React from "react";

export default class NonFieldErrors extends React.Component {
    render () {
        return (
            <div>
                {this.props.errors &&
                    <li bsStyle="list-unstyled">
                        {this.props.errors.map(this.createErrorItem)}
                    </li>
                }
            </div>
        )
    }

    createErrorItem(error) {
        return (
            <ul>{error}</ul>
        )
    }
}