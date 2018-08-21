import React from "react";

import ShallowRenderer from 'react-test-renderer/shallow';
import PlaceListContainer from "Places/Containers/PlaceListContainer";

const renderer = new ShallowRenderer();

describe('<PlaceListContainer />', () => {
    test('renders correctly', () => {
        const places = [{'id': 1, 'name': 'Place 1', 'imageUrl': 'example.com/place1.jpg'},
                        {'id': 2, 'name': 'Place 2', 'imageUrl': 'example.com/place2.jpg'}];
        const result = renderer.render(<PlaceListContainer places={places} />);
        expect(result).toMatchSnapshot();
    });
});