import React from "react";
import {shallow} from "enzyme";

import {TripList} from "../TripList";
import api from "../../utils/trips.api";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();
const faker = require('faker');


jest.mock('../../utils/trips.api.js');
describe('<TripList />', () => {
    describe('with no trips prop',() => {
        it('displays no <ListGroupItem /> component', () => {
            const container = shallow(<TripList dispatch={jest.fn()} />);
            expect(container.find(".trip-card").length).toEqual(0);
        });
    });

    describe('with trips prop',() => {
        const props = {
            trips: [],
            dispatch: jest.fn()
        }

        beforeEach(function() {
            props.trips = [{'id': faker.random.number(), 'name': faker.random.word(), 'locations': [{city: {name: faker.address.city()}}]}];
        });

        it('displays a <ListGroupItem /> component for a single trip', () => {
            const container = shallow(<TripList {...props} />);
            expect(container.find(".trip-card").length).toEqual(props.trips.length);
        });

        it('updates on new trip props', () => {
            const container = shallow(<TripList {...props} />);
            expect(container.find(".trip-card").length).toEqual(props.trips.length);

            let newTrips = [{'id': faker.random.number(), 'name': faker.random.word(), 'locations': [{city: {name: faker.address.city()}}]},
                {'id': faker.random.number(), 'name': faker.random.word(), 'locations': [{city: {name: faker.address.city()}}]}];
            container.setProps({trips: newTrips});
            expect(container.find(".trip-card").length).toEqual(newTrips.length);
        });
    });

    const props = {
        dispatch: jest.fn(),
        trips: []
    };

    beforeEach(() => {
        props.dispatch.mockReset();
    })

    test('renders a correctly', () => {
        const result = renderer.render(<TripList {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('dispatches getTrips upon mount', () => {
        shallow(<TripList {...props} />);
        expect(props.dispatch).toBeCalled();
    });

    // This can be moved to the redux tests
    test.skip('update sets trips returned from server as state', async () => {
        let trips = [faker.random.word(), faker.random.word()];

        // Need to refactor into a better way of changes mocks for a single test
        api.getTrips = jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
            let response = {status: 200, data: {data: {trips: trips}}};
            resolve(response);
        }));

        const container = shallow(<TripList />);
        await Promise.resolve();

        expect(container.state('trips')).toEqual(trips);
    });
});