import React from "react";

import {LocationItinerary} from "Itinerary/Components/LocationItinerary";
import ShallowRenderer from "react-test-renderer/shallow";
import {shallow} from "enzyme/build";
import MarkerMap from "../../../Maps/Components/MarkerMap";

const renderer = new ShallowRenderer();
jest.mock('Itinerary/utils/itinerary.api.js');

describe('<LocationItinerary />', () => {
    const props = {
        itinerary: {
            trip: {
                id: 1
            },
            city: {
                name: "Bristol",
                country: "United Kingdom",
                location: {
                    lat: 0.0,
                    lng: 0.0
                }
            },
            startDate: "2018-08-10T00:00:00.000Z",  // If the time isn't specified, the generated snapshot assumes it is the day before?
            endDate: "2018-08-12T00:00:00.000Z",
        },
        match: {
            params: {
                tripId: null
            }
        },
        dispatch: jest.fn()
    };

    test('<LocationItinerary /> renders correctly', () => {
        const result = renderer.render(<LocationItinerary {...props} />);
        expect(result).toMatchSnapshot();
    });
});