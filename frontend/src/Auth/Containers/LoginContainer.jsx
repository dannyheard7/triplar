import React from "react";
import LoginForm from "Auth/Components/LoginForm.jsx";
import {loginRequest} from "../utils/actions";
import {connect} from "react-redux";
import ReduxFormContainer from "../../Forms/Containers/ReduxFormContainer";
import {withRouter} from "react-router";
import {Helmet} from "react-helmet";

export class LoginContainer extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Login | Triplar</title>
                </Helmet>
                <ReduxFormContainer action={loginRequest}>
                    <LoginForm />
                </ReduxFormContainer>
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