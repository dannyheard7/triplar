import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, withRouter} from "react-router-dom";

export class LoggedInRoute extends React.Component {

    render() {
        const {isAuthenticated, Component, ...rest} = this.props;

        if (isAuthenticated) {
            return (
                <Route {...rest} Component/>
            );
        } else {
            return (
                <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps)(LoggedInRoute))