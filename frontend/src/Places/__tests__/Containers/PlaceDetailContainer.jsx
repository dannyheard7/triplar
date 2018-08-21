import React from "react";
import {shallow} from "enzyme";
import ShallowRenderer from 'react-test-renderer/shallow';
import PlaceDetailContainer from "Places/Containers/PlaceDetailContainer";
import LoadingIndicator from "App/Components/LoadingIndicator";

const renderer = new ShallowRenderer();

const faker = require('faker');
jest.mock('Places/utils/places.api.js');

const api = require('Places/utils/places.api.js');

describe('<PlaceDetailContainer />', () => {
    test('renders loading text before trip object returned by api', async () => {
        const container = shallow(<PlaceDetailContainer match={{params: {placeId: faker.random.number()}}} />);
        expect(container.find(LoadingIndicator).length).toEqual(1);
        await Promise.resolve();
        expect(container.find(LoadingIndicator).length).toEqual(0);
    });

    test('calls api getTripDetail with correct id on mount', () => {
        const spy = jest.spyOn(api.default, "getPlaceDetails");
        const id = faker.random.number();

        const container = shallow(<PlaceDetailContainer match={{params: {placeId: id}}} />);
        expect(spy).toBeCalledWith(id);
        spy.mockReset();
    });

    test('response from api call is set as state', async () => {
        const stub = jest.spyOn(api.default, "getPlaceDetails");
        const place = {'id': faker.random.number(), 'name': faker.random.word(), 'photos': [faker.internet.url()],
            'rating': faker.random.number()};
        stub.mockReturnValueOnce(Promise.resolve({status: 200, data: {data: {place: place}}}));

        const container = shallow(<PlaceDetailContainer match={{params: {placeId: place.id}}} />);
        await Promise.resolve();

        expect(stub).toBeCalledWith(place.id);
        expect(container.state('place')).toEqual(place);

        stub.mockRestore();
    });

    test('renders correctly with a trip object', async() => {
        const stub = jest.spyOn(api.default, "getPlaceDetails");
        const place = {'id': 1, 'name': "Cool Place", 'photos': ["example.com/example.jpg"],
            'rating': 3.5};
        stub.mockReturnValueOnce(Promise.resolve({status: 200, data: {data: {place: place}}}));

        const result = renderer.render(<PlaceDetailContainer match={{params: {placeId: place.id}}} />);
        expect(result).toMatchSnapshot();

        stub.mockRestore();
    });

});