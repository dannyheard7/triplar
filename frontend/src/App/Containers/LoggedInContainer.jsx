import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import axios from "axios";

export class LoggedInContainer extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.isAuthenticated) {
            this.setAuthHeader(this.props.token);
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.isAuthenticated) {
            this.setAuthHeader(nextProps.token);
        }
    }

    setAuthHeader(token) {
        axios.defaults.headers.common = {
            'Authorization': 'JWT ' + token
        };
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}


function mapStateToProps(state, props) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token
    }
}

export default withRouter(connect(mapStateToProps)(LoggedInContainer))