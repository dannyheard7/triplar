import React from "react";
import LoginForm from "../Components/LoginForm.jsx";
import {facebookLoginRequest, loginRequest} from "../utils/actions";
import {connect} from "react-redux";
import ReduxFormContainer from "../../Forms/Containers/ReduxFormContainer";
import {withRouter} from "react-router";
import {Helmet} from "react-helmet";
import FacebookLogin from 'react-facebook-login';

export class LoginContainer extends React.Component {

    facebookResponse = (response) => {
        this.props.dispatch(facebookLoginRequest(response.accessToken));
    };


    render() {
        return (
            <div>
                <Helmet>
                    <title>Login | Triplar</title>
                </Helmet>
                <h1>Login</h1>

                {this.props.auth.requesting ?
                    <p>Attempting to login...</p> :
                    <ReduxFormContainer action={loginRequest}>
                        <LoginForm/>
                    </ReduxFormContainer>
                }

                <FacebookLogin
                    appId="2240458192891426"
                    fields="name,email"
                    callback={this.facebookResponse} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

// make Redux state piece of `login` and our action `loginRequest`
// available in this.props within our component
export default withRouter(connect(mapStateToProps)(LoginContainer))