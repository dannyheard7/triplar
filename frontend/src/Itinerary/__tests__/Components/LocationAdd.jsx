import React from "react";
import {shallow} from "enzyme";

import ShallowRenderer from 'react-test-renderer/shallow';
import {LocationAdd} from "../../Components/LocationAdd";
import ReduxFormContainer from "../../../Forms/Containers/ReduxFormContainer";

const renderer = new ShallowRenderer();
const faker = require('faker');

jest.mock('../../utils/itinerary.api.js');

const api = require('../../utils/itinerary.api.js');

describe('<LocationAdd />', () => {
    const data = {tripLocation: {'id': faker.random.number(),
                'city': {'name_std': faker.address.city(), 'country': faker.address.country()}}};

    test('renders correctly', () => {
        const result = renderer.render(<LocationAdd trip={{id: 1, startDate: '2018-08-14', endDate: '2018-08-18'}} />);
        expect(result).toMatchSnapshot();
    });

    // TODO: Move to redux
    test.skip('calls onSuccess after receiving success from <FormContainer />', (function () {
        const spy = jest.spyOn(LocationAddContainer.prototype, 'onSuccess');
        const stub = jest.fn();
        const container = shallow(<LocationAdd trip={{id: faker.random.number()}} onSuccess={stub} />);
        container.setState({showLocationAdd: true});
        container.find(ReduxFormContainer).prop('onSuccess')(data);

        expect(spy).toBeCalledWith(data);
        expect(stub).toBeCalledWith(data.tripLocation)
    }));

    // TODO: Move to redux
    test.skip('addTripLocation called with correct arguments', () => {
        const spy = jest.spyOn(api.default, 'addTripLocation');
        const trip = {id: faker.random.number()};

        const container = shallow(<LocationAdd trip={trip} />);
        container.instance().apiFunc(data);

        expect(spy).toBeCalledWith(trip.id, data);

        spy.mockRestore();
    });




        // TODO
    test.skip('does not render <ReduxFormContainer /> after a trip has been created', () => {
        expect(container.find(ReduxFormContainer).length).toEqual(1);
        container.find(ReduxFormContainer).prop('onSuccess')(data);
        container.update();

        expect(container.state('showLocationAdd')).toEqual(false);
        expect(container.find(ReduxFormContainer).length).toEqual(0);
    });

});