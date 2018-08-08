import React from "react";
import {shallow} from "enzyme";
import {LoggedInRoute} from "App/Components/LoggedInRoute";
import {Route, Redirect} from "react-router-dom"


describe('<LoggedInRoute />', () => {
    test('when authenticated', () => {
        const props = {
            isAuthenticated: true,
            Component: jest.fn()
        };

        test('renders the component route', () => {
            const container = shallow(<LoggedInRoute {...props} />);
            expect(container.find(Route)).toHaveLength(1);
        });
    });

    test('when not authenticated', () => {
        const props = {
            isAuthenticated: false,
        };

        test('renders redirect to the login page', () => {
            const container = shallow(<LoggedInRoute {...props}/>);
            expect(container.find(Redirect)).toHaveLength(1);
        });
    });
});