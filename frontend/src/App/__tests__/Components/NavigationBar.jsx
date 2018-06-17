import React from "react";
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

import {NavigationBar} from "App/Components/NavigationBar";

const actions = require('Auth/actions');
const faker = require('faker');
const renderer = new ShallowRenderer();


describe('<NavigationBar />', () => {

    describe('when authenticated', () => {
        const user = {'email': faker.internet.email()};
        const dispatchStub = jest.fn();

        const props = {
            isAuthenticated: true,
            user: user,
            dispatch: dispatchStub
        };

        const logoutStub = jest.spyOn(actions, 'logout');

        afterEach(function () {
            logoutStub.mockReset();
            dispatchStub.mockReset();
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
            logoutStub.mockReturnValue(mock);

            container.instance().onLogoutClick();

            expect(logoutStub).toBeCalled();
            expect(dispatchStub).toBeCalledWith(mock);
        });

        test('renders correctly', () => {
            const result = renderer.render(<NavigationBar  />);
            // expect(result).toMatchSnapshot(); // How to do this with the changing email? - Property Matchers
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