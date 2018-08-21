import React from "react";
import {shallow} from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';

import {LoginContainer} from "Auth/Containers/LoginContainer";
import FormContainer from "Forms/Containers/FormContainer";

const actions = require('Auth/actions');
const renderer = new ShallowRenderer();
const faker = require('faker');


describe('<LoginContainer />', () => {
    const loginActionSpy = jest.spyOn(actions, 'login');
    const data = {user: {email: faker.internet.email()}, token: faker.random.word()};
    const props = {
        dispatch: jest.fn(),
        history: {push: jest.fn()}
    };

    afterEach(function () {
        loginActionSpy.mockReset();
        props.dispatch.mockReset();
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

    test('succesful login dispatches login action', () => {
        const container = shallow(<LoginContainer {...props} />);

        const loginStubReturn = jest.fn();
        loginActionSpy.mockReturnValue(loginStubReturn);

        container.instance().onSuccess(data);

        expect(loginActionSpy).toBeCalled();
        expect(props.dispatch).toBeCalledWith(loginStubReturn);
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