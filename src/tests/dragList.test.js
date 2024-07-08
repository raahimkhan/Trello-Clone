import { render, fireEvent, screen, act, cleanup } from '@testing-library/react';
import { resetStateReducer } from '../boardSlice';
import '@testing-library/jest-dom'
import React from 'react';
import App from '../App';
import store from '../store'
import { Provider } from 'react-redux'

describe('Testing list drag and drop', () => {

    beforeEach(async () => {
        await store.dispatch(resetStateReducer());
    });

    afterEach(cleanup);

    it('Application renders without crashing', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        unmount();
    });
    it('List drag and drop', async () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        // creating 20 lists
        for (let i = 1; i <= 20; i++) {
            const listAddButton = screen.queryByTestId('list-add');
            expect(listAddButton).toBeInTheDocument();
            fireEvent.click(listAddButton);
            const listAddInput = screen.queryByTestId('list-add-input');
            expect(listAddInput).toBeInTheDocument();
            fireEvent.change(listAddInput, { target: { value: `List ${i}` } });
            expect(listAddInput.value).toBe(`List ${i}`);
            const createListButton = screen.queryByTestId('create-list-button');
            expect(createListButton).toBeInTheDocument();
            await act( async () => fireEvent.click(createListButton));
        }
        // Verify the titles and orders of the created lists
        const listElements = screen.queryAllByTestId('list');
        expect(listElements.length).toBe(20);
        for (let i = 0; i < 20; i++) {
            const listTitle = listElements[i].querySelector('[data-testid="list-title"]');
            expect(listTitle).toBeInTheDocument();
            expect(listTitle.textContent.trim()).toBe(`List ${i + 1}`);
        }
        // Drag list
        const draggables = screen.queryAllByTestId('draggable-list');
        expect(draggables.length).toBe(20);
        const draggableSource = draggables[0];
        const consoleSpy = jest.spyOn(console, 'log');
        fireEvent.mouseDown(draggableSource);
        fireEvent.mouseMove(draggableSource, { clientX: 800, clientY: 0 });
        await act(async () => fireEvent.mouseUp(draggableSource));
        expect(consoleSpy).toHaveBeenLastCalledWith('Drag Started');
        unmount();
    });
});