import React from "react";

import TripDelete from "Trips/Components/TripDelete";
import ShallowRenderer from "react-test-renderer/shallow";
import {shallow} from "enzyme/build/index";
import {Redirect} from "react-router-dom";

const renderer = new ShallowRenderer();

jest.mock('utils/api.js');

describe('<TripDelete />', () => {
    const trip = {'id': 1, 'name': "Trip Test", 'created_by': "email@example.com"};
    const event = {
        preventDefault: () => {},
        target: {
            value: "",
            name: "",
        },
    };

    test('<TripDelete /> renders correctly', () => {
        const result = renderer.render(<TripDelete  trip={trip} />);
        expect(result).toMatchSnapshot();
    });

    test('redirects to trips page on successful deletion', async () => {
        const container = shallow(<TripDelete trip={trip} />);

        container.instance().onDelete(event);
        await Promise.resolve();
        container.update();

         expect(container.find(Redirect)).toHaveLength(1);
    });
});