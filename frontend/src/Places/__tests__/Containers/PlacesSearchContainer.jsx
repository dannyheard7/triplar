import React from "react";
import {shallow} from "enzyme";

import ShallowRenderer from 'react-test-renderer/shallow';
import PlacesSearchContainer from "Places/Containers/PlacesSearchContainer";

const renderer = new ShallowRenderer();

const faker = require('faker');
jest.mock('Places/utils/places.api.js');

const api = require('Places/utils/places.api.js');

describe('<PlacesSearchContainer />', () => {
    const event = {
        preventDefault: () => {},
        target: {value: "", name: ""},
    };

    const city = {name: faker.address.city(), country: {name: faker.address.country(), code: faker.address.countryCode},
        location: {lat: faker.address.latitude, lng: faker.address.longitude}};
    const places = [{'id': faker.random.number(), 'name': faker.random.word(), 'imageUrl': faker.internet.url()}];

    test('renders correctly', () => {
        const city = {name: 'Bristol', country: {name: 'United Kingdom'}};
        const result = renderer.render(<PlacesSearchContainer city={city} />);
        expect(result).toMatchSnapshot();
    });

    test('getPopularPlaces is called on mount', () => {
        const getPopularPlacesStub = jest.spyOn(PlacesSearchContainer.prototype, 'getPopularPlaces');
        const container = shallow(<PlacesSearchContainer city={city} />);
        expect(getPopularPlacesStub).toBeCalled();

        getPopularPlacesStub.mockRestore();
    });

    test('search onChange  calls searchPlaces if length >= 3', () => {
        const stub = jest.spyOn(PlacesSearchContainer.prototype, 'searchPlaces');
        const container = shallow(<PlacesSearchContainer city={city} />);

        event.target.value = "abc";
        container.find("input").prop('onChange')(event);

        expect(container.state('searchValue')).toEqual(event.target.value);
        expect(stub).toBeCalled();

        stub.mockRestore();
    });

    test('search onChange does not call searchPlaces if length < 3', () => {
        const stub = jest.spyOn(PlacesSearchContainer.prototype, 'searchPlaces');
        const container = shallow(<PlacesSearchContainer city={city} />);

        container.setState({popularPlacesCache: {"": places}});
        event.target.value = "ab";
        container.find("input").prop('onChange')(event);

        expect(stub).not.toBeCalled();
        expect(container.state('places')).toEqual(places);

        stub.mockRestore();
    });

    test('updatePlaces calls getPopularPlaces with subCategory not main category if one is set', () => {
        const getPopularPlacesStub = jest.spyOn(PlacesSearchContainer.prototype, 'getPopularPlaces');
        const container = shallow(<PlacesSearchContainer city={city} />);
        getPopularPlacesStub.mockClear(); // It is called on mount

        let subCategory = faker.lorem.word();
        container.setState({selectedSubCategory: subCategory});
        container.instance().updatePlaces();

        expect(getPopularPlacesStub).toBeCalledWith(subCategory);
        getPopularPlacesStub.mockRestore();
    });

    test('updatePlaces calls getPopularPlaces with selectedCategory if searchValue length is < 3', () => {
        const searchPlacesStub = jest.spyOn(PlacesSearchContainer.prototype, 'searchPlaces');
        const getPopularPlacesStub = jest.spyOn(PlacesSearchContainer.prototype, 'getPopularPlaces');
        const container = shallow(<PlacesSearchContainer city={city} />);
        getPopularPlacesStub.mockClear(); // It is called on mount

        container.instance().updatePlaces();

        expect(getPopularPlacesStub).toBeCalled();
        expect(searchPlacesStub).not.toBeCalled();

        searchPlacesStub.mockRestore();
        getPopularPlacesStub.mockRestore();
    });

    test('updatePlaces calls searchPlaces if searchValue length is > 3', () => {
        const searchPlacesStub = jest.spyOn(PlacesSearchContainer.prototype, 'searchPlaces');
        const getPopularPlacesStub = jest.spyOn(PlacesSearchContainer.prototype, 'getPopularPlaces');
        const container = shallow(<PlacesSearchContainer city={city} />);
        getPopularPlacesStub.mockClear(); // It is called on mount

        container.setState({searchValue: 'abcd'});
        container.instance().updatePlaces();

        expect(searchPlacesStub).toBeCalled();
        expect(getPopularPlacesStub).not.toBeCalled();

        searchPlacesStub.mockRestore();
        getPopularPlacesStub.mockRestore();
    });

    test('getPopularPlaces caches returned value from API', async () => {
        const stub = jest.spyOn(api.default, "getPopularPlaces");
        stub.mockReturnValueOnce(Promise.resolve({status: 200, data: {data: {popularPlaces: places}}}));

        const container = shallow(<PlacesSearchContainer city={city} />);
        await Promise.resolve();

        expect(stub).toBeCalledWith(city.location.lat, city.location.lng, "");
        expect(container.state('popularPlacesCache')).toEqual({"": places});

        stub.mockRestore();
    });

    test('getPopularPlaces uses cached value if it exists', async () => {
        const container = shallow(<PlacesSearchContainer city={city} />);
        await Promise.resolve(); // Initial call to the api onMount

        const spy = jest.spyOn(api.default, "getPopularPlaces");
        container.setState({popularPlacesCache: {"": places}});
        container.instance().getPopularPlaces("");

        expect(spy).not.toBeCalled();
        expect(container.state('places')).toEqual(places);
    });


    test('on category change, corresponding subcategories are updated from api', async () => {
        const container = shallow(<PlacesSearchContainer city={city} />);
        await Promise.resolve(); // Initial call to the api onMount

        event.target.value = "ab";

        const spy = jest.spyOn(api.default, "getSubCategories");
        let subCategories = [{name: faker.lorem.word(), alias: faker.lorem.word()}];
        spy.mockReturnValueOnce(Promise.resolve({status: 200, data: {data: {subCategories}}}));

        container.instance().onCategoryChange(event);

        await Promise.resolve();
        expect(spy).toBeCalledWith(event.target.value, city.country.code);
        expect(container.state('subCategories')).toEqual(subCategories);
    });
});