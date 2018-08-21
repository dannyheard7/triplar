import React from "react";

import TripListContainer from "Trips/Containers/TripListContainer";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();

describe('<TripsContainer />', () => {

    test('renders correctly', () => {
        const result = renderer.render(<TripListContainer  />);
        expect(result).toMatchSnapshot();
    });

});