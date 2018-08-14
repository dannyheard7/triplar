import React from "react";

import {TripDelete} from "Trips/Components/TripDelete";
import ShallowRenderer from "react-test-renderer/shallow";
import {shallow} from "enzyme/build/index";

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

    const props = {
        trip: trip,
        history: {push: jest.fn()}
    };


    test('<TripDelete /> renders correctly', () => {
        const result = renderer.render(<TripDelete  {...props} />);
        expect(result).toMatchSnapshot();
    });

    test.skip('redirects to trips page on successful deletion', async () => {
        //TODO: how to mock global jquery function

        const container = shallow(<TripDelete {...props} />);

        container.instance().onDelete(event);
        await Promise.resolve();
        container.update();

        expect(props.history.push).toBeCalledWith('/trips');
    });
});