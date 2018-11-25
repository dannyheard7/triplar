import React from "react";
import {shallow} from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';
import {TripDetail} from "Trips/Components/TripDetail";
import LoadingIndicator from "../../../App/Components/LoadingIndicator";

const renderer = new ShallowRenderer();

const faker = require('faker');

describe('<TripDetail />', () => {
    describe('with trip prop', () => {

        const props = {
            trip: null,
            locations: null
        }

        beforeAll(function () {
            // TODO: Need a better way to deal with this. Maybe a helper function that generates one?
            props.trip = {
                'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email(),
                'locations': [{
                    'id': faker.random.number,
                    'city': {'name_std': faker.address.city(), 'country': faker.address.country()}
                }]
            };
        });

        test('renders correctly', () => {
            props.trip = {
                'id': 1,
                'name': "test",
                'created_by': "email@example.com",
                'startDate': "2018-08-10",
                "endDate": "2018-08-12",
                'locations': [{'id': 1, 'city': {'name_std': "Bristol", 'country': "United Kingdom"}}]
            };
            const result = renderer.render(<TripDetail {...props} />);
            expect(result).toMatchSnapshot();
        });
    });

    test('renders loading text when no trip is passed', async () => {
         const props = {
            trip: {'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()},
            match: {params: {id: faker.random.number()}},
             locations: []
        };

        let container = shallow(<TripDetail {...props} trip={null}/>);
        expect(container.find(LoadingIndicator).length).toEqual(1);
        container = shallow(<TripDetail {...props}  />);
        expect(container.find(LoadingIndicator).length).toEqual(0);
    });


    // Move to redux tests
    test.skip('response from api call is set as state', async () => {
        const stub = jest.spyOn(api.default, "getTripDetail");
        const trip = {'id': faker.random.number(), 'name': faker.random.word(), 'created_by': faker.internet.email()};
        stub.mockReturnValueOnce(Promise.resolve({status: 200, data: {data: {trip: trip}}}));

        const container = shallow(<TripDetail {...props} match={{params: {id: trip.id}}}/>);
        await Promise.resolve();

        expect(stub).toBeCalledWith(trip.id);
        expect(container.state('trip')).toEqual(trip);

        stub.mockRestore(); // Changed the mock so restore it to original
    });

    test.skip("Renders trip not found on trips that don't exist", () => {

    });
});