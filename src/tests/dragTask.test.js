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
    it('Task drag and drop', async () => {
        // creating a new list
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        fireEvent.click(listAddButton);
        const listAddInput = screen.queryByTestId('list-add-input');
        expect(listAddInput).toBeInTheDocument();
        fireEvent.change(listAddInput, { target: { value: 'List 1' } });
        expect(listAddInput.value).toBe('List 1');
        const createListButton = screen.queryByTestId('create-list-button');
        expect(createListButton).toBeInTheDocument();
        await act( async () => fireEvent.click(createListButton));
        const listElements = screen.queryAllByTestId('list');
        expect(listElements.length).toBe(1);
        // now testing
        // verifying task add input box exists
        const listTaskAddSectionInput = listElements[0].querySelector('[data-testid="list-task-add-section-input"]');
        expect(listTaskAddSectionInput).toBeInTheDocument();
        fireEvent.change(listTaskAddSectionInput, { target: { value: 'Task 1' } });
        expect(listTaskAddSectionInput.value).toBe('Task 1');
        // verifying task add plus sign exists
        const listTaskAddSectionAddTask = listElements[0].querySelector('[data-testid="list-task-add-section-add-task"]');
        expect(listTaskAddSectionAddTask).toBeInTheDocument();
        // Create and verify 20 tasks
        for (let i = 1; i <= 20; i++) {
            const listTaskAddSectionInput = listElements[0].querySelector('[data-testid="list-task-add-section-input"]');
            expect(listTaskAddSectionInput).toBeInTheDocument();
            fireEvent.change(listTaskAddSectionInput, { target: { value: `Task ${i}` } });
            const listTaskAddSectionAddTask = listElements[0].querySelector('[data-testid="list-task-add-section-add-task"]');
            expect(listTaskAddSectionAddTask).toBeInTheDocument();
            // Click the "Add Task" button
            await act(async () => fireEvent.click(listTaskAddSectionAddTask));
            // Verify that the task has been added
            const listElementsAgain = screen.queryAllByTestId('list');
            expect(listElementsAgain.length).toBe(1);
            const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
            expect(tasks.length).toBe(i);
            // Verify the task title and order
            const task = tasks[i - 1];
            expect(task).toHaveTextContent(`Task ${i}`);
        }
        // now drag a task
        const draggables = screen.queryAllByTestId('draggable-task');
        expect(draggables.length).toBe(20);
        const draggableSource = draggables[0];
        const consoleSpy = jest.spyOn(console, 'log');
        fireEvent.mouseDown(draggableSource);
        fireEvent.mouseMove(draggableSource, { clientX: 0, clientY: 50 });
        await act(async () => fireEvent.mouseUp(draggableSource));
        expect(consoleSpy).toHaveBeenLastCalledWith('Drag Started');
        unmount();
    });
});