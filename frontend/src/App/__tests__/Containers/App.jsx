import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import axios from "axios";

const renderer = new ShallowRenderer();
const faker = require('faker');

import App from "App/Containers/App";
import {shallow} from "enzyme/build/index";
import {Redirect} from "react-router-dom";

jest.unmock('axios');
describe('<App />', () => {

    describe('when authenticated', () => {
        const user = {'email': faker.internet.email()};

        const props = {
            isAuthenticated: true,
            user: user,
        };

        test.skip('redirects to trips/', () => {
            const container = shallow(<App {...props}/>);
            expect(container.find(Redirect)).toHaveLength(1);
        });
    });

     describe('when not authenticated', () => {
        const props = {
            isAuthenticated: false,
        };

        test('renders correctly', () => {
            const result = renderer.render(<App {...props} />);
            expect(result).toMatchSnapshot();
        });
    });


});