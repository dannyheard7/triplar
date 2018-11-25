import React from "react";
import {shallow} from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ShallowRenderer();
import api from "Trips/utils/trips.api.js";

import {TripListContainer} from "Trips/Containers/TripListContainer";

const faker = require('faker');

jest.mock('Trips/utils/trips.api.js');
describe('<TripListContianer />', () => {
    const props = {
        dispatch: jest.fn(),
        trips: []
    };

    beforeEach(() => {
        props.dispatch.mockReset();
    })

    test('renders a correctly', () => {
        const result = renderer.render(<TripListContainer {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('dispatches getTrips upon mount', () => {
        shallow(<TripListContainer {...props} />);
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

        const container = shallow(<TripListContainer />);
        await Promise.resolve();

        expect(container.state('trips')).toEqual(trips);
    });

});