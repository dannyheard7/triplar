import React from "react";
import {shallow} from "enzyme";

import ShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ShallowRenderer();
const faker = require('faker');

import { TripCreateContainer } from "Trips/Containers/TripCreateContainer";
import FormContainer from "Forms/Containers/FormContainer";
import DestinationAddContainer from "Trips/Containers/DestinationAddContainer";

jest.mock('utils/api.js');

const api = require('utils/api.js');

describe('<DestinationAddContainer />', () => {
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    const itinerary = {'id': faker.random.number(), 'city': {'name_std': faker.address.city(), 'country': faker.address.country()}};


    test('renders correctly', () => {
        const result = renderer.render(<DestinationAddContainer tripId="1" />);
        expect(result).toMatchSnapshot();
    });

    test('calls onSuccess after receiving success from <FormContainer />', (function () {
        const spy = jest.spyOn(DestinationAddContainer.prototype, 'onSuccess');
        const stub = jest.fn();
        const container = shallow(<DestinationAddContainer  tripId={faker.random.number()} onSuccess={stub} />);
        container.setState({showDestinationAdd: true});
        container.find(FormContainer).prop('onSuccess')(itinerary);

        expect(spy).toBeCalledWith(itinerary);
        expect(stub).toBeCalledWith(itinerary)
    }));

    test('addDestinationToTrip called with correct arguments', () => {
        const spy = jest.spyOn(api.default, 'addDestinationToTrip');
        const id = faker.random.number();

        const container = shallow(<DestinationAddContainer  tripId={id} />);
        container.instance().apiFunc(itinerary);

        expect(spy).toBeCalledWith(id, itinerary);

        spy.mockRestore();
    });


    describe('destination create visible', () => {
        let container = null;

        beforeEach(function () {
            container = shallow(<DestinationAddContainer  tripId={faker.random.number()} onSuccess={jest.fn()}/>);
            container.setState({showDestinationAdd: true});
        });

        test('renders <FormContainer /> component when showTripCreate is true', () => {
            expect(container.find(FormContainer).length).toEqual(1);
        });

        test('updates state.showDestinationAdd when create button clicked', () => {
            container.find('.btn').simulate('click');
            expect(container.state('showDestinationAdd')).toBeFalsy();
        });


        test('does not render <FormContainer /> after a trip has been created', () => {
            expect(container.find(FormContainer).length).toEqual(1);
            container.find(FormContainer).prop('onSuccess')(itinerary);
            container.update();

            expect(container.state('showDestinationAdd')).toEqual(false);
            expect(container.find(FormContainer).length).toEqual(0);
        });

    });

});