import React from "react";

import RegistrationForm from "../Components/RegistrationForm";
import {Helmet} from "react-helmet";
import ReduxFormContainer from "../../Forms/Containers/ReduxFormContainer";
import {registerRequest} from "../utils/actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";

export class RegistrationContainer extends React.Component {
    render() {
        const errors = this.props.errors ? [this.props.errors] : [];

        return (
            <div>
                <Helmet>
                    <title>Register | Triplar</title>
                </Helmet>
                <h1>Register</h1>
                <ReduxFormContainer action={registerRequest} nonFieldErrors={errors}>
                    <RegistrationForm />
                </ReduxFormContainer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors.REGISTER
});


export default withRouter(connect(mapStateToProps)(RegistrationContainer))
