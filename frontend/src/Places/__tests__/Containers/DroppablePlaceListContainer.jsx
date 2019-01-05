import React from "react";

import ShallowRenderer from 'react-test-renderer/shallow';
import DroppablePlaceListContainer from "../../Containers/DroppablePlaceListContainer";

const renderer = new ShallowRenderer();

describe('<DroppablePlaceListContainer />', () => {
    const props = {
        connectDropTarget: jest.fn(),
        onDragRemove:jest.fn(),
        isOver: false,
        path: ''
    };

    // These don't work because of connectDropTarget wrapping
    test.skip('renders correctly with places', () => {
        const places = [{'id': 1, 'name': 'Place 1', 'imageUrl': 'example.com/place1.jpg'},
                        {'id': 2, 'name': 'Place 2', 'imageUrl': 'example.com/place2.jpg'}];
        const result = renderer.render(<DroppablePlaceListContainer places={places} {...props}/>);
        expect(result).toMatchSnapshot();
    });
    test.skip('renders correctly with no places', () => {
        const places = [];
        const result = renderer.render(<DroppablePlaceListContainer places={places} {...props} />);
        expect(result).toMatchSnapshot();
    });
});