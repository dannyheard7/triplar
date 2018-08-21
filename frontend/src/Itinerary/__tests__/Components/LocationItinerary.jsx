import React from "react";

import LocationItinerary from "Itinerary/Components/LocationItinerary";
import ShallowRenderer from "react-test-renderer/shallow";
import {shallow} from "enzyme/build";
import CityMap from "Maps/Components/CityMap";

const renderer = new ShallowRenderer();


describe('<LocationItinerary />', () => {
    const props = {
        location: {
            trip: {
                id: 1
            },
            city: {
                name: "Bristol",
                country: "United Kingdom"
            },
            startDate: "2018-08-10T00:00:00.000Z",  // If the time isn't specified, the generated snapshot assumes it is the day before?
            endDate: "2018-08-12T00:00:00.000Z",
        }
    };

    test('<LocationItinerary /> renders correctly', () => {
        const result = renderer.render(<LocationItinerary {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('<CityMap /> is shown when showMap is true', () => {
         const container = shallow(<LocationItinerary  {...props} />);
         container.setState({showMap: true});

         expect(container.find(CityMap).length).toEqual(1);
    });
});