import React from "react";
import {shallow} from "enzyme";
import api from "utils/api.js"

import TripCreateContainer from "Trips/Containers/TripCreateContainer";
import TripForm from "Trips/Components/TripForm";

const faker = require('faker');

describe('<TripCreateContainer />', () => {
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    test('calls handle change after receiving change from <TripForm />', (function () {
        const stub = jest.spyOn(TripCreateContainer.prototype, 'handleChange');

        const container = shallow(<TripCreateContainer />);
        container.find(TripForm).prop('onChange')(event);

        expect(stub).toBeCalled();
    }));

    test('calls handle submit after receiving submit from <TripForm />', () => {
        const stub = jest.spyOn(TripCreateContainer.prototype, 'handleSubmit');

        let container = shallow(<TripCreateContainer />);
        container.instance().create = jest.fn(); // Mock api call function
        container.instance().forceUpdate();

        container.find(TripForm).prop('onSubmit')(event);

        expect(stub).toBeCalled();
    });

    test('renders a <TripForm /> object', () => {
        const container = shallow(<TripCreateContainer />);
        expect(container.find(TripForm).length).toEqual(1);
    });

    test('updates the state when handleChange is called', () => {
        const container = shallow(<TripCreateContainer />);
        const instance = container.instance();
        const name = faker.random.word();

        instance.handleChange({'target': {'name': 'name', 'value': name}});
        expect(container.state('trip').name).toEqual(name);
    });

    test('errors state change updates TripForm Prop', function () {
        const container = shallow(<TripCreateContainer />);
        expect(container.find(TripForm).props().errors).toEqual(container.state('errors'));

        let errors = jest.fn();
        container.setState({errors: errors});

        expect(container.find(TripForm).props().errors).toEqual(errors);
    });

    test('unsuccesful trip create updates state errors',  async () => {
        const errors = [faker.random.word(), faker.random.word()];
        api.createTrip = jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
            let response = {status: 400, data: errors};
            resolve(response);
        }));

        const spy = jest.fn();
        const container = shallow(<TripCreateContainer onTripCreate={spy}/>);

        const trip = {'name': faker.random.word()};
        container.setState({'trip': trip});
        container.instance().create();
        await Promise.resolve();

        expect(container.state('errors')).toEqual(errors);
        expect(container.state('trip')).toEqual(trip);
        expect(spy).not.toBeCalled();
    });

    test('succesful trip create calls onTripCreate prop', async () => {
        const trip = {'name': faker.random.word()};
        api.createTrip = jest.fn().mockImplementationOnce(test => {
            return new Promise((resolve, reject) => {
                let response = {status: 201, data: test};
                resolve(response);
            });
        });

        const spy = jest.fn();
        const container = shallow(<TripCreateContainer onTripCreate={spy}/>);

        container.setState({'trip': trip});
        container.instance().create();
        await Promise.resolve();

        expect(spy).toHaveBeenCalledWith(trip);
        expect(container.state('trip')).toEqual({});
        expect(container.state('errors')).toEqual([]);
    });

});