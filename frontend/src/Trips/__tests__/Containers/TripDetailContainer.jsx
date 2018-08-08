import React from "react";
import {shallow} from "enzyme";
import api from "utils/api.js"

import TripDetail from "Trips/Components/TripDetail";
import TripEditContainer from "Trips/Containers/TripEditContainer";
import TripDelete from "Trips/Components/TripDelete";
import TripManagementRow from "Trips/Components/TripManagementRow";
import TripDetailContainer from "Trips/Containers/TripDetailContainer";

const faker = require('faker');
jest.mock('utils/api.js');

describe('<TripDetailContainer />', () => {
    test('only renders loading text without a trip object', () => {
        const container = shallow(<TripDetailContainer match={{params: {id: null}}} />);
        expect(container.children().length).toEqual(1);
        expect(container.text()).toEqual('Loading');
    });

    test('calls api getTrip with correct id on mount', () => {
        const spy = jest.spyOn(api, 'getTrip');
        const id = faker.random.number();

        const container = shallow(<TripDetailContainer match={{params: {id: id}}} />);
        expect(spy).toBeCalledWith(id);
    });

    test.skip('response from api call is set as state', () => {
        const spy = jest.spyOn(api, 'getTrip');
        const id = faker.random.number();

        const container = shallow(<TripDetailContainer match={{params: {id: id}}} />);
        expect(spy).toBeCalledWith(id);
    });

    describe('With a trip object', () => {
        let container = null;
        const trip = {
            'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()
        };

        beforeEach(function () {
            container = shallow(<TripDetailContainer match={{params: {id: 1}}}/>);
            container.setState({trip: trip});
        });

        test('renders a <TripDetail /> component', () => {
            expect(container.find(TripDetail).length).toEqual(1);
        });

        test('renders a <TripManagementRow /> component ', () => {
            expect(container.find(TripManagementRow).length).toEqual(1);
        });

        test('trip state change updates TripDetail Prop', function () {
            expect(container.find(TripDetail).props().trip).toEqual(trip);

            let newTrip = jest.fn();
            container.setState({trip: newTrip});

            expect(container.find(TripDetail).props().trip).toEqual(newTrip);
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
        const trip = {
            'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()
        };

        beforeEach(function () {
            container = shallow(<TripDetailContainer match={{params: {id: 1}}}/>);
            container.setState({trip: trip, edit: true});
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
            expect(container.find(TripEditContainer).props().trip).toEqual(trip);

            let newTrip = jest.fn();
            container.setState({trip: newTrip});
            container.update();

            expect(container.find(TripEditContainer).props().trip).toEqual(newTrip);
        });
    });

    describe('delete mode', () => {
        let container = null;
        const trip = {
            'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()
        };

        beforeEach(function () {
            container = shallow(<TripDetailContainer match={{params: {id: 1}}}/>);
            container.setState({trip: trip});
            container.setState({delete: true});
        });

        test('renders a <TripDelete /> component', () => {
            expect(container.find(TripDelete).length).toEqual(1);
        });

        test('trip state change updates TripDelete Prop', function () {
            expect(container.find(TripDelete).props().trip).toEqual(trip);

            let newTrip = jest.fn();
            container.setState({trip: newTrip});

            expect(container.find(TripDelete).props().trip).toEqual(newTrip);
        });
    });

});