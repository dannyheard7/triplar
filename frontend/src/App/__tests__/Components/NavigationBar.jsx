import React from "react";
import {shallow} from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

import {NavigationBar} from "App/Components/NavigationBar";

const actions = require('Auth/actions');
const faker = require('faker');
const renderer = new ShallowRenderer();


describe('<NavigationBar />', () => {

    describe('when authenticated', () => {
        const user = {'email': "test@example.com"};

        const props = {
            isAuthenticated: true,
            user: user,
            dispatch: jest.fn(),
            history: {push: jest.fn()}
        };

        const logoutSpy = jest.spyOn(actions, 'logout');

        afterEach(function () {
            logoutSpy.mockReset();
            props.dispatch.mockReset();
        });


        test('calls onLogoutClick when logout button is clicked', () => {
            const logoutClickStub  = jest.spyOn(NavigationBar.prototype, "onLogoutClick");

            const container = shallow(<NavigationBar  {...props}/>);
            container.find("#logout-button").simulate('click');
            expect(logoutClickStub).toBeCalled();
        });

        test('displays user email', () => {
            const container = shallow(<NavigationBar {...props}/>);
            expect(container.find("#user-dropdown").text()).toEqual(user['email'])
        });

        test('dispatches logout on logoutClick', () => {
            const container = shallow(<NavigationBar {...props}/>);

            const mock = jest.fn();
            logoutSpy.mockReturnValue(mock);

            container.instance().onLogoutClick();

            expect(logoutSpy).toBeCalled();
            expect(props.dispatch).toBeCalledWith(mock);
        });

        test('redirects to logout on logoutClick', () => {
            const container = shallow(<NavigationBar {...props}/>);

            const mock = jest.fn();
            logoutSpy.mockReturnValue(mock);

            container.instance().onLogoutClick();

            expect(logoutSpy).toBeCalled();
            expect(props.history.push).toBeCalledWith('/login');

        });

        test('renders correctly', () => {
            const result = renderer.render(<NavigationBar  />);
            expect(result).toMatchSnapshot();
        });

    });

    describe('when not authenticated', () => {
        const props = {
            isAuthenticated: false,
        };

        test('renders correctly', () => {
            const result = renderer.render(<NavigationBar  />);
            expect(result).toMatchSnapshot();
        });
    });
});