import React from "react";
import {shallow} from "enzyme";
import axios from "axios";
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();
const faker = require('faker');

import {LoggedInContainer} from "App/Containers/LoggedInContainer";

jest.unmock('axios');

describe('<LoggedInContainer />', () => {

    test('sets axios auth header on mount', () => {
        let props = {
            token: faker.random.number(),
            isAuthenticated: true
        };

        const container = shallow(<LoggedInContainer {...props}><React.Component/></LoggedInContainer>);
        expect(axios.defaults.headers.common['Authorization']).toEqual('JWT ' + props.token);
    });

    test('renders child components', () => {
        let props = {
            token: faker.random.number(),
            isAuthenticated: true,
            children: <React.Component/>
        };

        const result = renderer.render(<LoggedInContainer {...props} />);
        expect(result).toMatchSnapshot();
    });

});