import React from "react";
import axios from "axios";

export default class LoggedInContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setAuthHeader(this.props.token);
    }

    setAuthHeader(token) {
        axios.defaults.headers.common = {
            'Authorization': 'JWT ' + token
        };
    }

    render() {
        return this.props.children
    }
}