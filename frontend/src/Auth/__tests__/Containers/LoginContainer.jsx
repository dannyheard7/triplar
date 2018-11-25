import React from "react";
import {shallow} from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';

import {LoginContainer} from "Auth/Containers/LoginContainer";
import ReduxFormContainer from "Forms/Containers/ReduxFormContainer";

const actions = require('Auth/utils/actions');
const renderer = new ShallowRenderer();
const faker = require('faker');


describe('<LoginContainer />', () => {
    const loginActionSpy = jest.spyOn(actions, 'loginRequest');
    const data = {tokenAuth: {user: {email: faker.internet.email()},
                        'token': faker.random.number() }};

    afterEach(function () {
        loginActionSpy.mockReset();
    });

    test('renders correctly', () => {
        const result = renderer.render(<LoginContainer />);
        expect(result).toMatchSnapshot();
    });

});