import React from "react";
import {shallow} from "enzyme";

import TripDetail from "Trips/Components/TripDetail";
import TripManagement from "Trips/Components/TripManagement";
import TripDetailContainer from "Trips/Containers/TripDetailContainer";
import LoadingIndicator from "App/Components/LoadingIndicator";

const faker = require('faker');
jest.mock('Trips/utils/trips.api.js');

const api = require('Trips/utils/trips.api.js');

describe('<TripDetailContainer />', () => {
    test('renders loading text before trip object returned by api', async () => {
        const container = shallow(<TripDetailContainer match={{params: {id: faker.random.number()}}} />);
        expect(container.find(LoadingIndicator).length).toEqual(1);
        await Promise.resolve();
        expect(container.find(LoadingIndicator).length).toEqual(0);
    });

    test('calls api getTripDetail with correct id on mount', () => {
        const spy = jest.spyOn(api.default, "getTripDetail");
        const id = faker.random.number();

        const container = shallow(<TripDetailContainer match={{params: {id: id}}} />);
        expect(spy).toBeCalledWith(id);
        spy.mockReset();
    });

    test('response from api call is set as state', async () => {
        const stub = jest.spyOn(api.default, "getTripDetail");
        const trip = {'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()};
        stub.mockReturnValueOnce(Promise.resolve({status: 200, data: {data: {trip: trip}}}));

        const container = shallow(<TripDetailContainer match={{params: {id: trip.id}}} />);
        await Promise.resolve();

        expect(stub).toBeCalledWith(trip.id);
        expect(container.state('trip')).toEqual(trip);

        stub.mockRestore(); // Changed the mock so restore it to original
    });

    test.skip("Renders trip not found on trips that don't exist", () => {

    });

    describe('With a trip object', () => {
        let container = null;

        beforeEach(async () => {
            container = shallow(<TripDetailContainer match={{params: {id: 1}}}/>);
            await Promise.resolve();
        });

        test('renders a <TripDetail /> component', () => {
            expect(container.find(TripDetail).length).toEqual(1);
        });

        test('renders a <TripManagement /> component ', () => {
            expect(container.find(TripManagement).length).toEqual(1);
        });

        test('trip state change updates TripDetail Prop', async () => {
            const trip = {
                'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()
            };

            expect(container.find(TripDetail).props().trip).not.toEqual(trip);
            container.setState({trip: trip});
            expect(container.find(TripDetail).props().trip).toEqual(trip);
        });

        test('onUpdate sets trip param as state', () => {
            let newTrip = jest.fn();
            container.instance().onUpdate(newTrip);
            expect(container.state('trip')).toEqual(newTrip);
        });
    });

});