import React from "react";
import {shallow} from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';

import LoginContainer from "Auth/Containers/LoginContainer";
import FormContainer from "Forms/Containers/FormContainer";

const actions = require('Auth/utils/actions');
const renderer = new ShallowRenderer();
const faker = require('faker');


describe('<LoginContainer />', () => {
    const loginActionSpy = jest.spyOn(actions, 'login');
    const data = {tokenAuth: {user: {email: faker.internet.email()},
                        'token': faker.random.number() }};
    const props = {
        history: {push: jest.fn()},
        onLogin: jest.fn()
    };

    afterEach(function () {
        loginActionSpy.mockReset();
        props.onLogin.mockReset();
    });

    test('renders correctly', () => {
        const result = renderer.render(<LoginContainer {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('calls onSuccess after receiving success from <FormContainer />', (function () {
        const spy = jest.spyOn(LoginContainer.prototype, "onSuccess");
        const container = shallow(<LoginContainer  {...props}/>);

        container.find(FormContainer).prop('onSuccess')(data);

        expect(spy).toBeCalled();
    }));

    test('succesful login calls login function', () => {
        const container = shallow(<LoginContainer {...props} />);

        const loginStubReturn = jest.fn();
        loginActionSpy.mockReturnValue(loginStubReturn);

        container.instance().onSuccess(data);

        expect(loginActionSpy).toBeCalled();
    });

    test('succesful login calls onLogin prop', () => {
        const container = shallow(<LoginContainer {...props} />);

        const loginStubReturn = jest.fn();
        loginActionSpy.mockReturnValue(loginStubReturn);
        container.instance().onSuccess(data);

        expect(props.onLogin).toBeCalled();
    });

    test('redirection to trips after successful login', () => {
        const container = shallow(<LoginContainer {...props} />);

        const loginStubReturn = jest.fn();
        loginActionSpy.mockReturnValue(loginStubReturn);

        container.instance().onSuccess(data);

        expect(loginActionSpy).toBeCalled();
        expect(props.history.push).toBeCalledWith('/trips');
    });
});