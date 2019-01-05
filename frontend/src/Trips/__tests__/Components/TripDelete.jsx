import React from "react";

import {TripDelete} from "../../Components/TripDelete";
import ShallowRenderer from "react-test-renderer/shallow";
import {shallow} from "enzyme/build/index";
import {deleteTrip} from "../../utils/actions";

const renderer = new ShallowRenderer();

jest.mock('../../utils/trips.api.js');

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
        dispatch: jest.fn()
    };


    test('<TripDelete /> renders correctly', () => {
        const result = renderer.render(<TripDelete  {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('dispatches trip delete on dlete', async () => {
        const container = shallow(<TripDelete {...props} />);

        container.instance().onDelete(event);
        expect(props.dispatch).toBeCalledWith(deleteTrip(trip.id));
    });
});