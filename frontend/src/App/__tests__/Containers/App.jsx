import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();
const faker = require('faker');

import App from "App/Containers/App";

describe('<App />', () => {

    describe('when authenticated', () => {
        const user = {'email': faker.internet.email()};

        const props = {
            isAuthenticated: true,
            user: user,
        };

        test('renders correctly', () => {
            const result = renderer.render(<App/>);
            expect(result).toMatchSnapshot();
        });
    });

     describe('when not authenticated', () => {
        const props = {
            isAuthenticated: false,
        };

        test('renders correctly', () => {
            const result = renderer.render(<App  />);
            expect(result).toMatchSnapshot();
        });
    });


});