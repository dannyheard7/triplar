import React from "react";
import {shallow} from "enzyme";
import api from "utils/api.js"
import ShallowRenderer from 'react-test-renderer/shallow';

import RegistrationContainer from "Auth/Containers/RegistrationContainer";
import RegistrationForm from "Auth/Components/RegistrationForm";
import {Redirect} from "react-router-dom";

const renderer = new ShallowRenderer();
const faker = require('faker');

jest.mock('utils/api.js');
describe('<RegistrationContainer />', () => {
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    test('calls handle submit after receiving submit from <RegistrationForm />', () => {
        let stub = jest.spyOn(RegistrationContainer.prototype, 'handleSubmit');

        const container = shallow(<RegistrationContainer />);
        container.find(RegistrationForm).prop('onSubmit')(event);

        expect(stub).toBeCalled();
    });

    test('calls handle change after receiving change from <RegistrationForm />', () => {
        let stub = jest.spyOn(RegistrationContainer.prototype, 'handleChange');

        const container = shallow(<RegistrationContainer />);
        container.find(RegistrationForm).prop('onChange')(event);

        expect(stub).toBeCalled();
    });

    test('renders correctly', () => {
        const result = renderer.render(<RegistrationContainer  />);
        expect(result).toMatchSnapshot();
    });

    test('updates the state when handleChange is called', () => {
        const container = shallow(<RegistrationContainer />);
        const instance = container.instance();
        const email = faker.internet.email();

        instance.handleChange({'target': {'name': 'email', 'value': email}});
        expect(container.state('email')).toEqual(email);
    });

    test('errors state change updates RegistrationForm Prop', () => {
        const container = shallow(<RegistrationContainer />);
        expect(container.find(RegistrationForm).props().errors).toEqual(container.state('errors'));

        let errors = [faker.lorem.word, faker.lorem.word];
        container.setState({errors: errors});

        expect(container.find(RegistrationForm).props().errors).toEqual(errors);
    });

    test('redirects to login page on succesful registration', async () => {
        const container = shallow(<RegistrationContainer />);

        container.instance().register();
        await Promise.resolve();
        container.update();

         expect(container.find(Redirect)).toHaveLength(1);
    });

    test('unsuccesful registration updates state errors', async () => {
        const container = shallow(<RegistrationContainer />);

        const errors = [faker.lorem.word, faker.lorem.word];
        api.registerUser = jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
            let response = {status: 400, data: errors};
            resolve(response);
        }));

        container.instance().register();
        await Promise.resolve();

        expect(container.state('errors')).toEqual(errors);
    });

    test.skip('registration form sends data to API', function (done) {

    });

});