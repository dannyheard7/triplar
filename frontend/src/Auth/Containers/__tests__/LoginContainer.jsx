import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {LoginContainer} from "../LoginContainer";

const actions = require('../../utils/actions');
const renderer = new ShallowRenderer();
const faker = require('faker');


describe('<LoginContainer />', () => {
    const loginActionSpy = jest.spyOn(actions, 'loginRequest');
    const data = {tokenAuth: {user: {email: faker.internet.email()},
                        'jwt': faker.random.number() }};

    const props = {
        auth: {
            requesting: false
        }
    };

    afterEach(function () {
        loginActionSpy.mockReset();
    });

    test('renders correctly', () => {
        const result = renderer.render(<LoginContainer {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('renders correctly when requesting', () => {
        const result = renderer.render(<LoginContainer {...props} auth={{requesting: true}} />);
        expect(result).toMatchSnapshot();
    });

});