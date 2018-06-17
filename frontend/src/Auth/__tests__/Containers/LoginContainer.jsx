import React from "react";
import {shallow} from "enzyme";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ShallowRenderer from 'react-test-renderer/shallow';

import {LoginContainer} from "Auth/Containers/LoginContainer";
import LoginForm from "Auth/Components/LoginForm";

const actions = require('Auth/actions');
const renderer = new ShallowRenderer();
const faker = require('faker');

describe('<LoginContainer />', () => {
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    test('calls handle submit after receiving submit from <LoginForm />', () => {
        const stub = jest.spyOn(LoginContainer.prototype, 'handleSubmit');

        const container = shallow(<LoginContainer />);
        container.find(LoginForm).prop('onSubmit')(event);

        expect(stub).toBeCalled();
    });

    test('calls handle change after receiving change from <LoginForm />', () => {
        const stub = jest.spyOn(LoginContainer.prototype, 'handleChange');

        const container = shallow(<LoginContainer />);
        container.find(LoginForm).prop('onChange')(event);

        expect(stub).toBeCalled();
    });

    test('renders correctly', () => {
        const result = renderer.render(<LoginContainer  />);
        expect(result).toMatchSnapshot();
    });

    test('updates the state when handleChange is called', () => {
        const container = shallow(<LoginContainer />);
        const instance = container.instance();
        const email = faker.internet.email();

        instance.handleChange({'target': {'name': 'email', 'value': email}});
        expect(container.state('email')).toEqual(email);
    });

    test('errors state change updates LoginForm Prop', () => {
        const container = shallow(<LoginContainer />);
        expect(container.find(LoginForm).props().errors).toEqual(container.state('errors'));

        let errors = [faker.lorem.word, faker.lorem.word];
        container.setState({errors: errors});

        expect(container.find(LoginForm).props().errors).toEqual(errors);
    });

    describe('api', () => {
        const loginStub = jest.spyOn(actions, 'login');
        const routerSpy = {
            push: jest.fn()
        };
        const dispatchStub = jest.fn();
        let mockAdapter = new MockAdapter(axios);

        beforeAll(function () {
            axios.defaults.validateStatus = function (status) {
                return (status >= 200 && status < 300) || (status == 400)
            };
        });

        afterEach(function () {
            loginStub.mockReset();
            routerSpy.push.mockReset();
            dispatchStub.mockReset();
        });

        test('succesful registration dispatches login', function (done) {
            const container = shallow(<LoginContainer router={routerSpy} dispatch={dispatchStub}/>);
            mockAdapter.onPost('/token/').reply(200, jest.fn());

            const loginStubReturn = jest.fn();
            loginStub.mockReturnValue(loginStubReturn);

            container.instance().login();

            setTimeout(() => {
                expect(loginStub).toBeCalled();
                expect(dispatchStub).toBeCalledWith(loginStubReturn);
                done();
            }, 0);
        });

        test('unsuccesful registration updates state errors', function (done) {
            const container = shallow(<LoginContainer />);

            const errors = [faker.lorem.word, faker.lorem.word];
            mockAdapter.onPost('/token/').reply(400, errors); // Getting some errors from axios mock adapter
            container.instance().login();

            setTimeout(() => {
                expect(container.state('errors')).toEqual(errors);
                expect(loginStub).not.toBeCalled();
                done();
            }, 0);
        });

        test.skip('registration form sends data to API', function (done) {

        });
    });
});