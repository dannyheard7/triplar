import React from "react";

import DestinationItinerary from "Trips/Components/DestinationItinerary";
import ShallowRenderer from "react-test-renderer/shallow";
import {shallow} from "enzyme/build";
import CityMap from "Maps/Components/CityMap";

const renderer = new ShallowRenderer();


describe('<DestinationItinerary />', () => {
    const props = {
        itinerary: {
            city: {
                name_std: "Bristol",
                country: "United Kingdom"
            },
            start_date: "2018-08-10",
            end_date: "2018-08-12",
        }
    };

    test('<DestinationItinerary /> renders correctly', () => {
        const result = renderer.render(<DestinationItinerary {...props} />);
        expect(result).toMatchSnapshot();
    });

    test('<CityMap /> is shown when showMap is true', () => {
         const container = shallow(<DestinationItinerary  {...props} />);
         container.setState({showMap: true});

         expect(container.find(CityMap).length).toEqual(1);
    });
});