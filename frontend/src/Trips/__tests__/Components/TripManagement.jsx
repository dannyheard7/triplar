import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TripManagement from "Trips/Components/TripManagement";

const renderer = new ShallowRenderer();


describe('<TripManagement />', () => {
    const props = {
        trip: {id: 1},
    };

    test('renders correctly', () => {
        const result = renderer.render(<TripManagement {...props} />);
        expect(result).toMatchSnapshot();
    });
});