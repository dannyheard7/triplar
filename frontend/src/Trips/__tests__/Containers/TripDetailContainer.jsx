import React from "react";
import {shallow} from "enzyme";

import TripDetail from "Trips/Components/TripDetail";
import TripEditContainer from "Trips/Containers/TripEditContainer";
import TripDelete from "Trips/Components/TripDelete";
import TripManagementRow from "Trips/Components/TripManagementRow";
import TripDetailContainer from "Trips/Containers/TripDetailContainer";

const faker = require('faker');
jest.mock('utils/api.js');

const api = require('utils/api.js');

describe('<TripDetailContainer />', () => {

    test('renders loading text before trip object returned by api', async () => {
        const container = shallow(<TripDetailContainer match={{params: {id: faker.random.number()}}} />);
        expect(container.text()).toEqual('Loading');
        await Promise.resolve();
        expect(container.text()).not.toEqual('Loading');
    });

    test('calls api getTrip with correct id on mount', () => {
        const spy = jest.spyOn(api.default, "getTrip");
        const id = faker.random.number();

        const container = shallow(<TripDetailContainer match={{params: {id: id}}} />);
        expect(spy).toBeCalledWith(id);
    });

    test('response from api call is set as state', async () => {
        const stub = api.default.getTrip;
        const trip = {
            'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()
        };

        stub.mockReturnValueOnce(new Promise((resolve, reject) => {
            let response = {status: 200, data: trip};
            resolve(response);
        }));

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

        test('renders a <TripManagementRow /> component ', () => {
            expect(container.find(TripManagementRow).length).toEqual(1);
        });

        test('trip state change updates TripDetail Prop', async () => {
            const trip = {
                'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()
            };

            expect(container.find(TripDetail).props().trip).not.toEqual(trip);
            container.setState({trip: trip});
            expect(container.find(TripDetail).props().trip).toEqual(trip);
        });
    });

    describe('edit mode', () => {
        const event = {
            preventDefault: () => {},
            target: {
                value: "",
                name: "",
            },
        };

        let container = null;

        beforeEach(async () => {
            container = shallow(<TripDetailContainer match={{params: {id: 1}}}/>);
            await Promise.resolve();
            container.setState({edit: true});
        });

        test('renders <TripEditContainer /> component', () => {
            expect(container.find(TripEditContainer).length).toEqual(1);
        });

        test('does not render <TripDetail /> component', () => {
            expect(container.find(TripDetail).length).toEqual(0);
        });

        test('does not render <TripEditContainer /> after a trip has been updated', () => {
            expect(container.find(TripEditContainer).length).toEqual(1);
            container.find(TripEditContainer).prop('onUpdate')(event);

            expect(container.state('edit')).toEqual(false);
            container.update();
            expect(container.find(TripEditContainer).length).toEqual(0);
        });

        test('the trip is updated from <TripEditContainer /> after an edit', () => {
            let newTrip = jest.fn();
            container.find(TripEditContainer).prop('onUpdate')(newTrip);
            expect(container.state('trip')).toEqual(newTrip);
        });

        test('trip state change updates TripEdit Prop', function () {
            const trip = {
                'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()
            };

            expect(container.find(TripEditContainer).props().trip).not.toEqual(trip);
            container.setState({trip: trip});
            expect(container.find(TripEditContainer).props().trip).toEqual(trip);
        });
    });

    describe('delete mode', () => {
        let container = null;

        beforeEach(async () => {
            container = shallow(<TripDetailContainer match={{params: {id: 1}}}/>);
            await Promise.resolve();
            container.setState({delete: true});
        });

        test('renders a <TripDelete /> component', () => {
            expect(container.find(TripDelete).length).toEqual(1);
        });

        test('trip state change updates TripDelete Prop', function () {
            const trip = {
                'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()
            };

            expect(container.find(TripDelete).props().trip).not.toEqual(trip);
            container.setState({trip: trip});
            expect(container.find(TripDelete).props().trip).toEqual(trip);
        });
    });

});