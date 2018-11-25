import React from "react";
import {shallow} from "enzyme";

import ShallowRenderer from 'react-test-renderer/shallow';
import FormContainer from "Forms/Containers/FormContainer";
import LocationAddContainer from "Itinerary/Containers/LocationAddContainer";
import ReduxFormContainer from "../../../Forms/Containers/ReduxFormContainer";

const renderer = new ShallowRenderer();
const faker = require('faker');

jest.mock('Itinerary/utils/itinerary.api.js');

const api = require('Itinerary/utils/itinerary.api.js');

describe('<LocationAddContainer />', () => {
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    const data = {tripLocation: {'id': faker.random.number(),
                'city': {'name_std': faker.address.city(), 'country': faker.address.country()}}};


    test('renders correctly', () => {
        const result = renderer.render(<LocationAddContainer tripId="1" />);
        expect(result).toMatchSnapshot();
    });

    // TODO: Move to redux
    test.skip('calls onSuccess after receiving success from <FormContainer />', (function () {
        const spy = jest.spyOn(LocationAddContainer.prototype, 'onSuccess');
        const stub = jest.fn();
        const container = shallow(<LocationAddContainer tripId={faker.random.number()} onSuccess={stub} />);
        container.setState({showLocationAdd: true});
        container.find(FormContainer).prop('onSuccess')(data);

        expect(spy).toBeCalledWith(data);
        expect(stub).toBeCalledWith(data.tripLocation)
    }));

    // TODO: Move to redux
    test.skip('addLocationToTrip called with correct arguments', () => {
        const spy = jest.spyOn(api.default, 'addLocationToTrip');
        const id = faker.random.number();

        const container = shallow(<LocationAddContainer tripId={id} />);
        container.instance().apiFunc(data);

        expect(spy).toBeCalledWith(id, data);

        spy.mockRestore();
    });


    describe('destination create visible', () => {
        let container = null;

        beforeEach(function () {
            container = shallow(<LocationAddContainer tripId={faker.random.number()} onSuccess={jest.fn()}/>);
            container.setState({showLocationAdd: true});
        });

        test('renders <ReduxFormContainer /> component when showTripCreate is true', () => {
            expect(container.find(ReduxFormContainer).length).toEqual(1);
        });

        test('updates state.showLocationAdd when create button clicked', () => {
            container.find('.btn').simulate('click');
            expect(container.state('showLocationAdd')).toBeFalsy();
        });


        // TODO
        test.skip('does not render <ReduxFormContainer /> after a trip has been created', () => {
            expect(container.find(ReduxFormContainer).length).toEqual(1);
            container.find(ReduxFormContainer).prop('onSuccess')(data);
            container.update();

            expect(container.state('showLocationAdd')).toEqual(false);
            expect(container.find(ReduxFormContainer).length).toEqual(0);
        });

    });

});