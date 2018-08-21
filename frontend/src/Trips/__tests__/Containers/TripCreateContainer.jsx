import React from "react";
import {shallow} from "enzyme";

import ShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ShallowRenderer();

import TripCreateContainer from "Trips/Containers/TripCreateContainer";
import FormContainer from "Forms/Containers/FormContainer";

const faker = require('faker');

describe('<TripCreateContainer />', () => {
    const data = {trip: {id: faker.random.number()}};

    const props = {
        history: {push: jest.fn()}
    };

    test('renders correctly', () => {
        const result = renderer.render(<TripCreateContainer {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('calls onSuccess after receiving success from <FormContainer />', (function () {
        const stub = jest.spyOn(TripCreateContainer.prototype, 'onSuccess');
        const container = shallow(<TripCreateContainer  {...props}/>);
        container.setState({showTripCreate: true});
        container.find(FormContainer).prop('onSuccess')(data);

        expect(stub).toBeCalled();
        expect(props.history.push).toBeCalledWith('/trips/' + data.trip.id);
    }));

    test('onSuccess redirects to trip page', (function () {
        const container = shallow(<TripCreateContainer  {...props}/>);
        container.instance().onSuccess(data);

        expect(props.history.push).toBeCalledWith('/trips/' + data.trip.id);
    }));

    describe('trip create visible', () => {
        let container = null;

        beforeEach(function () {
            container = shallow(<TripCreateContainer  {...props}/>);
            container.setState({showTripCreate: true});
        });

        test('renders <FormContainer /> component when showTripCreate is true', () => {
            expect(container.find(FormContainer).length).toEqual(1);
        });

        test('updates state.showTripCreate when create button clicked', () => {
            container.find('.btn').simulate('click');
            expect(container.state('showTripCreate')).toBeFalsy();
        });

        test('does not render <FormContainer /> after a trip has been created', () => {
            expect(container.find(FormContainer).length).toEqual(1);
            container.find(FormContainer).prop('onSuccess')(data);
            container.update();

            expect(container.state('showTripCreate')).toEqual(false);
            expect(container.find(FormContainer).length).toEqual(0);
        });
    });

});