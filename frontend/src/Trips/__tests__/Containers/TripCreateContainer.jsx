import React from "react";
import {shallow} from "enzyme";
import mockAxios from 'jest-mock-axios';

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

    test('calls handle submit after receiving submit from <TripForm />', () => {
        const stub = jest.spyOn(TripCreateContainer.prototype, 'handleSubmit');

        const container = shallow(<TripCreateContainer />);
        container.find(TripForm).prop('onSubmit')(event);

        expect(stub).toBeCalled();
    });

    test('calls handle change after receiving change from <TripForm />', (function () {
        const stub = jest.spyOn(TripCreateContainer.prototype, 'handleChange');

        const container = shallow(<TripCreateContainer />);
        container.find(TripForm).prop('onChange')(event);

        expect(stub).toBeCalled();
    }));

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

    describe('api', () => {
        afterEach(() => {
            mockAxios.reset();
        });

        test('trip information sent correctly', () => {
            const spy = jest.fn();
            const container = shallow(<TripCreateContainer  onTripCreate={spy}/>);

            const trip = {'name': faker.random.word()};
            container.setState({trip: trip});
            container.instance().create();

            expect(mockAxios.post).toHaveBeenCalledWith('/trips/', trip);
        });


        test('succesful trip create calls onTripCreate prop',  () => {
            const spy = jest.fn();
            const container = shallow(<TripCreateContainer onTripCreate={spy}/>);

            container.setState({'name': faker.random.word()});
            container.instance().create();

            let responseObj = { status: 201, data: jest.fn() };
            mockAxios.mockResponse(responseObj);

            expect(spy).toBeCalled();
        });

        test('unsuccesful trip create updates state errors', function (done) {
            const spy = jest.fn();
            const container = shallow(<TripCreateContainer onTripCreate={spy}/>);

            container.setState({'name': faker.random.word()});
            container.instance().create();

            const errors = jest.fn();
            let responseObj = { status: 400, data: errors };
            mockAxios.mockResponse(responseObj);

            expect(container.state('errors')).toEqual(errors);
            expect(spy).not.toBeCalled();
        });
    });
});