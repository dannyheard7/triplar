import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, withRouter} from "react-router-dom";

/* Only routes logged out users can see */
export class LoggedOutRoute extends React.Component {

    render() {
        const {isAuthenticated, Component, ...rest} = this.props;

        if (!isAuthenticated) {
            return (
                <Route {...rest} Component/>
            );
        } else {
            return (
                <Redirect to="/trips" />
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps)(LoggedOutRoute))