import React from "react";
import {shallow} from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

import HeaderAuthenticated from "App/Components/HeaderAuthenticated";

const actions = require('Auth/utils/actions');
const faker = require('faker');
const renderer = new ShallowRenderer();


describe('<HeaderAuthenticated />', () => {
    const user = {'email': "test@example.com"};

    const props = {
        isAuthenticated: true,
        user: user,
        history: {push: jest.fn()},
        onLogout: jest.fn()
    };

    const logoutSpy = jest.spyOn(actions, 'logout');

    afterEach(function () {
        logoutSpy.mockReset();
        props.history.push.mockReset();
        props.onLogout.mockReset();
    });

    test('calls onLogoutClick when logout button is clicked', () => {
        const logoutClickStub  = jest.spyOn(HeaderAuthenticated.prototype, "onLogoutClick");

        const container = shallow(<HeaderAuthenticated  {...props}/>);
        container.setState({showDropdown: true});
        container.find("#logout-button").simulate('click');
        expect(logoutClickStub).toBeCalled();
    });

    test('calls logout on logoutClick', () => {
        const container = shallow(<HeaderAuthenticated {...props}/>);
        container.setState({showDropdown: true});

        const mock = jest.fn();
        logoutSpy.mockReturnValue(mock);

        container.instance().onLogoutClick();

        expect(logoutSpy).toBeCalled();
        expect(props.onLogout).toBeCalled();
    });

    test('redirects to logout on logoutClick', () => {
        const container = shallow(<HeaderAuthenticated {...props}/>);
        container.setState({showDropdown: true});

        const mock = jest.fn();
        logoutSpy.mockReturnValue(mock);

        container.instance().onLogoutClick();

        expect(logoutSpy).toBeCalled();
        expect(props.history.push).toBeCalledWith('/login');
    });

    test('renders correctly', () => {
        const result = renderer.render(<HeaderAuthenticated {...props} />);
        expect(result).toMatchSnapshot();
    });
});