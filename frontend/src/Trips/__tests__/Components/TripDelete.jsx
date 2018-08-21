import React from "react";

import TripDelete from "Trips/Components/TripDelete";
import ShallowRenderer from "react-test-renderer/shallow";
import {shallow} from "enzyme/build/index";

const renderer = new ShallowRenderer();

jest.mock('Trips/utils/trips.api.js');

describe('<TripDelete />', () => {
    const trip = {'id': 1, 'name': "Trip Test", 'created_by': "email@example.com"};
    const event = {
        target: {
            value: "",
            name: "",
        },
    };

    const props = {
        trip: trip,
        history: {push: jest.fn()}
    };


    test('<TripDelete /> renders correctly', () => {
        const result = renderer.render(<TripDelete  {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('redirects to trips page on successful deletion', async () => {
        const container = shallow(<TripDelete {...props} />);

        container.instance().onDelete(event);
        await Promise.resolve();
        container.update();

        expect(props.history.push).toBeCalledWith('/trips');
    });
});