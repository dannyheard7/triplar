import React from "react";
import {shallow} from "enzyme";
import axios from "axios";
import ShallowRenderer from 'react-test-renderer/shallow';

import RegistrationContainer from "Auth/Containers/RegistrationContainer";
import RegistrationForm from "Auth/Components/RegistrationForm";

const renderer = new ShallowRenderer();
const faker = require('faker');

jest.unmock('axios');
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

    // Need to convert this to the new mocks
    describe('api', () => {
        beforeAll(function () {
            axios.defaults.validateStatus = function (status) {
                return (status >= 200 && status < 300) || (status == 400)
            };
        });


        test.skip('redirects to login page on succesful registration', function (done) {
            const container = shallow(<RegistrationContainer />);
            mockAdapter.onPost('/register/').reply(201, jest.fn());

            container.instance().register();

            setTimeout(() => {
                // expect(routerSpy.push.called).to.be.true;
                done();
            }, 0);
        });

        test.skip('unsuccesful registration updates state errors', function (done) {
            const container = shallow(<RegistrationContainer />);

            const errors = [faker.lorem.word, faker.lorem.word];
            mockAdapter.onPost('/register/').reply(400, errors);
            container.instance().register();

            setTimeout(() => {
                expect(container.state('errors')).toEqual(errors);
                done();
            }, 0);
        });
    });
});