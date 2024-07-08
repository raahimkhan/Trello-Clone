import { render, fireEvent, screen, act, cleanup } from '@testing-library/react';
import { resetStateReducer } from '../boardSlice';
import '@testing-library/jest-dom'
import React from 'react';
import App from '../App';
import store from '../store'
import { Provider } from 'react-redux'

describe('Testing list functionalities', () => {

    beforeEach(async () => {
        await store.dispatch(resetStateReducer());
    });

    afterEach(cleanup);

    it('Application renders without crashing', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        unmount();
    });
    it('Clicking add task icon without specifying the task displays an alert', async () => {
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
        // verifying task add plus sign exists
        const listTaskAddSectionAddTask = listElements[0].querySelector('[data-testid="list-task-add-section-add-task"]');
        expect(listTaskAddSectionAddTask).toBeInTheDocument();
        // Click and verify that alert opens when + icon click while input is empty
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        fireEvent.click(listTaskAddSectionAddTask);
        expect(alertSpy).toHaveBeenCalledWith('Please enter a task');
        alertSpy.mockRestore();
        unmount();
    });
    it('Clicking add task icon after specifying the task successfully adds the task to the particular list', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        unmount();
    });
    it('Added task contains task title', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        unmount();
    });
    it('Added task contains task edit icon', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        unmount();
    });
    it('Added task contains task delete icon', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        unmount();
    });
    it('Clicking the task delete icon successfully deletes the task', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskDeleteIcon));
        // verify task deleted
        const updatedListElements = screen.queryAllByTestId('list');
        expect(updatedListElements.length).toBe(1);
        const listData = updatedListElements[0].querySelector('[data-testid="list-data"]');
        expect(listData).toBeInTheDocument();
        expect(listData.textContent.trim()).toBe('No tasks available!');
        const updatedTasks = updatedListElements[0].querySelectorAll('[data-testid="task"]');
        expect(updatedTasks.length).toBe(0);
        unmount();
    });
    it('Clicking the task edit icon opens the modal window', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        unmount();
    });
    it('Modal window contains close icon', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        unmount();
    });
    it('Modal window contains current list title', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        // verify current list title
        const listNameHeading = modal.querySelector('[data-testid="list-name"]');
        expect(listNameHeading).toBeInTheDocument();
        const listNameText = listNameHeading.textContent;
        expect(listNameText).toContain("List 1");
        unmount();
    });
    it('Modal window contains input for specifying updated task title', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        // verify current list title
        const listNameHeading = modal.querySelector('[data-testid="list-name"]');
        expect(listNameHeading).toBeInTheDocument();
        const listNameText = listNameHeading.textContent;
        expect(listNameText).toContain("List 1");
        // verify input
        const modalInput = modal.querySelector('[data-testid="task-title-edit-input"]');
        expect(modalInput).toBeInTheDocument();
        unmount();
    });
    it('Text input within the modal registers text changes', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        // verify current list title
        const listNameHeading = modal.querySelector('[data-testid="list-name"]');
        expect(listNameHeading).toBeInTheDocument();
        const listNameText = listNameHeading.textContent;
        expect(listNameText).toContain("List 1");
        // verify input
        const modalInput = modal.querySelector('[data-testid="task-title-edit-input"]');
        expect(modalInput).toBeInTheDocument();
        // register change
        fireEvent.change(modalInput, { target: { value: '123abc' } });
        expect(modalInput.value).toBe('123abc');
        unmount();
    });
    it('Modal window contains text area for specifying updated task description', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        // verify current list title
        const listNameHeading = modal.querySelector('[data-testid="list-name"]');
        expect(listNameHeading).toBeInTheDocument();
        const listNameText = listNameHeading.textContent;
        expect(listNameText).toContain("List 1");
        // verify input
        const modalInput = modal.querySelector('[data-testid="task-title-edit-input"]');
        expect(modalInput).toBeInTheDocument();
        // verify text area
        const modalArea = modal.querySelector('[data-testid="task-description-edit-input"]');
        expect(modalArea).toBeInTheDocument();
        unmount();
    });
    it('Text area within the modal window registers text changes', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        // verify current list title
        const listNameHeading = modal.querySelector('[data-testid="list-name"]');
        expect(listNameHeading).toBeInTheDocument();
        const listNameText = listNameHeading.textContent;
        expect(listNameText).toContain("List 1");
        // verify input
        const modalInput = modal.querySelector('[data-testid="task-title-edit-input"]');
        expect(modalInput).toBeInTheDocument();
        // verify text area
        const modalArea = modal.querySelector('[data-testid="task-description-edit-input"]');
        expect(modalArea).toBeInTheDocument();
        // verify changes
        fireEvent.change(modalArea, { target: { value: 'abc xyz' } });
        expect(modalArea.value).toBe('abc xyz');
        unmount();
    });
    it('Modal window contains button to update task details', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        // verify current list title
        const listNameHeading = modal.querySelector('[data-testid="list-name"]');
        expect(listNameHeading).toBeInTheDocument();
        const listNameText = listNameHeading.textContent;
        expect(listNameText).toContain("List 1");
        // verify input
        const modalInput = modal.querySelector('[data-testid="task-title-edit-input"]');
        expect(modalInput).toBeInTheDocument();
        // verify text area
        const modalArea = modal.querySelector('[data-testid="task-description-edit-input"]');
        expect(modalArea).toBeInTheDocument();
        // verify update task details button
        const modalUpdateButtom = modal.querySelector('[data-testid="task-update-button"]');
        expect(modalUpdateButtom).toBeInTheDocument();
        unmount();
    });
    it('Update task details button within modal window is titled appropriately', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        // verify current list title
        const listNameHeading = modal.querySelector('[data-testid="list-name"]');
        expect(listNameHeading).toBeInTheDocument();
        const listNameText = listNameHeading.textContent;
        expect(listNameText).toContain("List 1");
        // verify input
        const modalInput = modal.querySelector('[data-testid="task-title-edit-input"]');
        expect(modalInput).toBeInTheDocument();
        // verify text area
        const modalArea = modal.querySelector('[data-testid="task-description-edit-input"]');
        expect(modalArea).toBeInTheDocument();
        // verify update task details button
        const modalUpdateButtom = modal.querySelector('[data-testid="task-update-button"]');
        expect(modalUpdateButtom).toBeInTheDocument();
        expect(modalUpdateButtom.textContent.trim()).toBe("Update task details");
        unmount();
    });
    it('Clicking the close icon within the modal window closes the modal', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        // click
        fireEvent.click(modalCloseIcon);
        // verify modal closed
        expect(screen.queryByTestId('task-edit-modal')).toBeNull();
        unmount();
    });
    it('Clicking the "Update task details" button while text input is empty displays an alert', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        // verify current list title
        const listNameHeading = modal.querySelector('[data-testid="list-name"]');
        expect(listNameHeading).toBeInTheDocument();
        const listNameText = listNameHeading.textContent;
        expect(listNameText).toContain("List 1");
        // verify input
        const modalInput = modal.querySelector('[data-testid="task-title-edit-input"]');
        expect(modalInput).toBeInTheDocument();
        fireEvent.change(modalInput, { target: { value: '' } });
        expect(modalInput.value).toBe('');
        // verify text area
        const modalArea = modal.querySelector('[data-testid="task-description-edit-input"]');
        expect(modalArea).toBeInTheDocument();
        // verify update task details button
        const modalUpdateButtom = modal.querySelector('[data-testid="task-update-button"]');
        expect(modalUpdateButtom).toBeInTheDocument();
        // click modal update button
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
        fireEvent.click(modalUpdateButtom);
        expect(alertMock).toHaveBeenCalledWith('Task title cannot be empty! Please write title for the task.');
        alertMock.mockRestore();
        unmount();
    });

    it('Task title and description updates successfully', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        // verify current list title
        const listNameHeading = modal.querySelector('[data-testid="list-name"]');
        expect(listNameHeading).toBeInTheDocument();
        const listNameText = listNameHeading.textContent;
        expect(listNameText).toContain("List 1");
        // verify input
        const modalInput = modal.querySelector('[data-testid="task-title-edit-input"]');
        expect(modalInput).toBeInTheDocument();
        fireEvent.change(modalInput, { target: { value: 'My updated title of task' } });
        expect(modalInput.value).toBe('My updated title of task');
        // verify text area
        const modalArea = modal.querySelector('[data-testid="task-description-edit-input"]');
        expect(modalArea).toBeInTheDocument();
        fireEvent.change(modalArea, { target: { value: 'My updated description of task' } });
        expect(modalArea.value).toBe('My updated description of task');
        // verify update task details button
        const modalUpdateButtom = modal.querySelector('[data-testid="task-update-button"]');
        expect(modalUpdateButtom).toBeInTheDocument();
        // click modal update button
        await act( async () => fireEvent.click(modalUpdateButtom));
        // verify
        const taskEditAgain = currentTask.querySelector('[data-testid="task-edit"]');
        fireEvent.click(taskEditAgain);
        const modalAgain = screen.queryByTestId('task-edit-modal');
        expect(modalAgain).toBeInTheDocument();
        const taskTitleEditInputAgain = modalAgain.querySelector('[data-testid="task-title-edit-input"]');
        expect(taskTitleEditInputAgain).toBeInTheDocument();
        const taskDescriptionEditInputAgain = modalAgain.querySelector('[data-testid="task-description-edit-input"]');
        expect(taskDescriptionEditInputAgain).toBeInTheDocument();
        expect(taskTitleEditInputAgain.value).toBe('My updated title of task');
        expect(taskDescriptionEditInputAgain.value).toBe('My updated description of task');
        unmount();
    });

    it('Original values of task title and task description are there if users changes those but closes the modal window', async () => {
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
        // Add the task
        await act( async () => fireEvent.click(listTaskAddSectionAddTask));
        // Verify the task has been added
        const listElementsAgain = screen.queryAllByTestId('list');
        expect(listElementsAgain.length).toBe(1);
        const tasks = listElementsAgain[0].querySelectorAll('[data-testid="task"]');
        expect(tasks.length).toBe(1);
        // Verify task title
        const currentTask = tasks[0];
        const taskTitleElement = currentTask.querySelector('[data-testid="task-title"]');
        expect(taskTitleElement).toBeInTheDocument();
        expect(taskTitleElement.textContent).toContain('Task 1');
        // Verify task edit icon
        const taskEditIcon = currentTask.querySelector('[data-testid="task-edit"]');
        expect(taskEditIcon).toBeInTheDocument();
        // Verify task delete icon
        const taskDeleteIcon = currentTask.querySelector('[data-testid="task-delete"]');
        expect(taskDeleteIcon).toBeInTheDocument();
        // click
        await act( async () => fireEvent.click(taskEditIcon));
        // verify modal opens
        const modal = screen.queryByTestId('task-edit-modal');
        expect(modal).toBeInTheDocument();
        // verify close icon
        const modalCloseIcon = screen.queryByTestId('task-edit-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        // verify current list title
        const listNameHeading = modal.querySelector('[data-testid="list-name"]');
        expect(listNameHeading).toBeInTheDocument();
        const listNameText = listNameHeading.textContent;
        expect(listNameText).toContain("List 1");
        // verify input
        const modalInput = modal.querySelector('[data-testid="task-title-edit-input"]');
        expect(modalInput).toBeInTheDocument();
        fireEvent.change(modalInput, { target: { value: 'My updated title of task' } });
        expect(modalInput.value).toBe('My updated title of task');
        // verify text area
        const modalArea = modal.querySelector('[data-testid="task-description-edit-input"]');
        expect(modalArea).toBeInTheDocument();
        fireEvent.change(modalArea, { target: { value: 'My updated description of task' } });
        expect(modalArea.value).toBe('My updated description of task');
        // verify update task details button
        const modalUpdateButtom = modal.querySelector('[data-testid="task-update-button"]');
        expect(modalUpdateButtom).toBeInTheDocument();
        // close modal
        fireEvent.click(modalCloseIcon);
        // verify original values are there
        const taskEditAgain = currentTask.querySelector('[data-testid="task-edit"]');
        fireEvent.click(taskEditAgain);
        const modalAgain = screen.queryByTestId('task-edit-modal');
        expect(modalAgain).toBeInTheDocument();
        const taskTitleEditInputAgain = modalAgain.querySelector('[data-testid="task-title-edit-input"]');
        expect(taskTitleEditInputAgain).toBeInTheDocument();
        const taskDescriptionEditInputAgain = modalAgain.querySelector('[data-testid="task-description-edit-input"]');
        expect(taskDescriptionEditInputAgain).toBeInTheDocument();
        expect(taskTitleEditInputAgain.value).toBe('Task 1');
        expect(taskDescriptionEditInputAgain.value).toBe('');
        unmount();
    });
    it('Add multiple tasks within a list and verify their titles and order', async () => {
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
        unmount();
    });
});