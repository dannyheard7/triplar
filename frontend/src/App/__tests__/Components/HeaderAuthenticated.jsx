import React from "react";
import {shallow} from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

import {HeaderAuthenticated} from "../../Components/HeaderAuthenticated";

const actions = require('../../../Auth/utils/actions');
const faker = require('faker');
const renderer = new ShallowRenderer();


describe('<HeaderAuthenticated />', () => {
    const user = {'email': "test@example.com"};

    const props = {
        auth: {user: user},
        dispatch: jest.fn()
    };


    afterEach(function () {
        props.dispatch.mockReset()
    });

    test('calls onLogoutClick when logout button is clicked', () => {
        const logoutClickStub  = jest.spyOn(HeaderAuthenticated.prototype, "onLogoutClick");

        const container = shallow(<HeaderAuthenticated  {...props}/>);
        container.setState({showDropdown: true});
        container.find("#logout-button").simulate('click');
        expect(logoutClickStub).toBeCalled();
    });

    test('dispatched unsetUser on logoutClick', () => {
        const container = shallow(<HeaderAuthenticated {...props}/>);
        container.setState({showDropdown: true});

        const mock = jest.fn();

        container.instance().onLogoutClick();

        expect(props.dispatch).toBeCalled();
    });

    test('renders correctly', () => {
        const result = renderer.render(<HeaderAuthenticated {...props} />);
        expect(result).toMatchSnapshot();
    });
});