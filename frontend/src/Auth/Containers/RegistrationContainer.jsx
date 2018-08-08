import React from "react";
import api from "utils/api.js";
import { Redirect } from 'react-router'

import RegistrationForm from "Auth/Components/RegistrationForm";

export default class RegistrationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            errors: [],
            redirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;

        if (confirmPassword !== password) {
            this.setState({errors: {'confirm_password': ["Passwords don't match"]}});
        } else {
            this.register();
        }
    }

    register() {
        const email = this.state.email;
        const password = this.state.password;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;

        api.registerUser(email, password, firstName, lastName).then(response => {
            let data = response.data;

            if (response.status === 201) {
                this.setState({redirect: true});
            } else if (response.status === 400) {
                this.setState({errors: data});
            }
        }).catch(err => console.log(err))
    }

    render() {

        if(this.state.redirect) {
            return (
                <Redirect to="/login" />
            );
        } else {
            return (
                <RegistrationForm onSubmit={this.handleSubmit} onChange={this.handleChange}
                                  errors={this.state.errors}/>
            );
        }
    }
}