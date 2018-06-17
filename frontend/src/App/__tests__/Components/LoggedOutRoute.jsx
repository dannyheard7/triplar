import React from "react";
import {shallow} from "enzyme";
import sinon from "sinon";
import {LoggedOutRoute} from "App/Components/LoggedOutRoute";
import {Route, Redirect} from "react-router-dom"


describe('<LoggedOutRoute />', () => {
    test('when authenticated', () => {
        const props = {
            isAuthenticated: true,
        };

         test('renders redirect to the boards page', () => {
            const container = shallow(<LoggedOutRoute {...props}/>);
            expect(container.find(Redirect)).toHaveLength(1);
        });

    });

    test('when not authenticated', () => {
        const componentSpy = sinon.spy();

        const props = {
            isAuthenticated: false,
            Component: componentSpy
        };

        test('renders the component route', () => {
            const container = shallow(<LoggedOutRoute {...props} />);
            expect(container.find(Route)).toHaveLength(1);
        });

    });
});