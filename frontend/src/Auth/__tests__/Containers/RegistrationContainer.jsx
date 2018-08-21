import React from "react";
import {shallow} from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';

import { RegistrationContainer } from "Auth/Containers/RegistrationContainer";
import FormContainer from "Forms/Containers/FormContainer";

const renderer = new ShallowRenderer();
const faker = require('faker');

describe('<RegistrationContainer />', () => {
    const data = {user: {email: faker.internet.email(), password: faker.internet.password(), first_name: faker.name.firstName(),
        last_name: faker.name.lastName()}};
    const props = {
        history: {push: jest.fn()}
    };

    afterEach(() => {
       props.history.push.mockReset();
    });

    test('renders correctly', () => {
        const result = renderer.render(<RegistrationContainer {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('calls onSuccess after receiving success from <FormContainer />',  () => {
        const spy = jest.spyOn(RegistrationContainer.prototype, "onSuccess");
        const container = shallow(<RegistrationContainer  {...props}/>);

        container.find(FormContainer).prop('onSuccess')(data);

        expect(spy).toBeCalled();
    });

    test('redirection to login after successful registration', () => {
        const container = shallow(<RegistrationContainer {...props} />);
        container.instance().onSuccess(data);

        expect(props.history.push).toBeCalledWith('/login');
    });
});