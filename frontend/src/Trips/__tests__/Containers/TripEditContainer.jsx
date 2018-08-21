import React from "react";
import {shallow} from "enzyme";

import ShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ShallowRenderer();

import TripEditContainer from "Trips/Containers/TripEditContainer";
import FormContainer from "Forms/Containers/FormContainer";

jest.mock('utils/api.js');
const api = require('utils/api.js');
const faker = require('faker');

describe('<TripEditContainer />', () => {
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    test('renders correctly', () => {
        const result = renderer.render(<TripEditContainer />);
        expect(result).toMatchSnapshot();
    });

    test('patchTrip called with correct arguments', () => {
        const spy = jest.spyOn(api.default, 'patchTrip');
        const trip = {id: faker.random.number(), name: faker.random.word()};

        const container = shallow(<TripEditContainer  trip={trip} />);
        container.instance().apiFunc(trip);

        expect(spy).toBeCalledWith(trip.id, trip);

        spy.mockRestore();
    });

    test('calls onSuccess after receiving success from <FormContainer />', (function () {
        const stub = jest.spyOn(TripEditContainer.prototype, 'onSuccess');

        const container = shallow(<TripEditContainer onUpdate={jest.fn()}/>);
        container.find(FormContainer).prop('onSuccess')(event);

        expect(stub).toBeCalled();
    }));
});