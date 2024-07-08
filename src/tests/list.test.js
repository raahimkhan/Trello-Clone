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

    it('Create a new list and verify it renders on the Trello board', async () => {
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
        unmount();
    });
    it('Created list contains list title', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        unmount();
    });
    it('Created list contains list title edit icon', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        unmount();
    });
    it('Created list contains "no tasks available!" text within the data container', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // verifying that task content is empty, i.e., it is "No tasks available!"
        const listData = listElements[0].querySelector('[data-testid="list-data"]');
        expect(listData).toBeInTheDocument();
        expect(listData.textContent.trim()).toBe('No tasks available!');
        unmount();
    });
    it('Created list contains text input for specifying the task title', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // verifying that task content is empty, i.e., it is "No tasks available!"
        const listData = listElements[0].querySelector('[data-testid="list-data"]');
        expect(listData).toBeInTheDocument();
        expect(listData.textContent.trim()).toBe('No tasks available!');
        // verifying task add input box exists
        const listTaskAddSectionInput = listElements[0].querySelector('[data-testid="list-task-add-section-input"]');
        expect(listTaskAddSectionInput).toBeInTheDocument();
        unmount();
    });
    it('Text input for specifying the task title registers text changes', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // verifying that task content is empty, i.e., it is "No tasks available!"
        const listData = listElements[0].querySelector('[data-testid="list-data"]');
        expect(listData).toBeInTheDocument();
        expect(listData.textContent.trim()).toBe('No tasks available!');
        // verifying task add input box exists
        const listTaskAddSectionInput = listElements[0].querySelector('[data-testid="list-task-add-section-input"]');
        expect(listTaskAddSectionInput).toBeInTheDocument();
        fireEvent.change(listTaskAddSectionInput, { target: { value: 'Task 1' } });
        expect(listTaskAddSectionInput.value).toBe('Task 1');
        unmount();
    });
    it('Created list contains add icon to add a new task', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // verifying that task content is empty, i.e., it is "No tasks available!"
        const listData = listElements[0].querySelector('[data-testid="list-data"]');
        expect(listData).toBeInTheDocument();
        expect(listData.textContent.trim()).toBe('No tasks available!');
        // verifying task add input box exists
        const listTaskAddSectionInput = listElements[0].querySelector('[data-testid="list-task-add-section-input"]');
        expect(listTaskAddSectionInput).toBeInTheDocument();
        // verifying task add plus sign exists
        const listTaskAddSectionAddTask = listElements[0].querySelector('[data-testid="list-task-add-section-add-task"]');
        expect(listTaskAddSectionAddTask).toBeInTheDocument();
        unmount();
    });
    it('Created list contains button to delete the list', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // verifying that task content is empty, i.e., it is "No tasks available!"
        const listData = listElements[0].querySelector('[data-testid="list-data"]');
        expect(listData).toBeInTheDocument();
        expect(listData.textContent.trim()).toBe('No tasks available!');
        // verifying task add input box exists
        const listTaskAddSectionInput = listElements[0].querySelector('[data-testid="list-task-add-section-input"]');
        expect(listTaskAddSectionInput).toBeInTheDocument();
        // verifying task add plus sign exists
        const listTaskAddSectionAddTask = listElements[0].querySelector('[data-testid="list-task-add-section-add-task"]');
        expect(listTaskAddSectionAddTask).toBeInTheDocument();
        // verifying list delete button exists
        const listDelete = listElements[0].querySelector('[data-testid="delete-list-button"]');
        expect(listDelete).toBeInTheDocument();
        unmount();
    });
    it('Delete button to delete the list is titled appropriately', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // verifying that task content is empty, i.e., it is "No tasks available!"
        const listData = listElements[0].querySelector('[data-testid="list-data"]');
        expect(listData).toBeInTheDocument();
        expect(listData.textContent.trim()).toBe('No tasks available!');
        // verifying task add input box exists
        const listTaskAddSectionInput = listElements[0].querySelector('[data-testid="list-task-add-section-input"]');
        expect(listTaskAddSectionInput).toBeInTheDocument();
        // verifying task add plus sign exists
        const listTaskAddSectionAddTask = listElements[0].querySelector('[data-testid="list-task-add-section-add-task"]');
        expect(listTaskAddSectionAddTask).toBeInTheDocument();
        // verifying list delete button exists
        const listDelete = listElements[0].querySelector('[data-testid="delete-list-button"]');
        expect(listDelete).toBeInTheDocument();
        expect(listDelete.textContent.trim()).toBe("Delete");
        unmount();
    });
    it('Delete button to delete the list is working as expected, i.e., it deletes the list successfully', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // verifying that task content is empty, i.e., it is "No tasks available!"
        const listData = listElements[0].querySelector('[data-testid="list-data"]');
        expect(listData).toBeInTheDocument();
        expect(listData.textContent.trim()).toBe('No tasks available!');
        // verifying task add input box exists
        const listTaskAddSectionInput = listElements[0].querySelector('[data-testid="list-task-add-section-input"]');
        expect(listTaskAddSectionInput).toBeInTheDocument();
        // verifying task add plus sign exists
        const listTaskAddSectionAddTask = listElements[0].querySelector('[data-testid="list-task-add-section-add-task"]');
        expect(listTaskAddSectionAddTask).toBeInTheDocument();
        // verifying list delete button exists
        const listDelete = listElements[0].querySelector('[data-testid="delete-list-button"]');
        expect(listDelete).toBeInTheDocument();
        expect(listDelete.textContent.trim()).toBe("Delete");
        await act( async () => fireEvent.click(listDelete));
        const listElementss = screen.queryAllByTestId('list');
        expect(listElementss).toHaveLength(0);
        unmount();
    });
    it('Edit title icon button opens the modal window when clicked', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // click edit icon button
        fireEvent.click(editIcon);
        // verify modal opens
        const modal = screen.queryByTestId('list-title-edit-modal');
        expect(modal).toBeInTheDocument();
        unmount();
    });

    it('Modal window contains current title of the particular list', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // click edit icon button
        fireEvent.click(editIcon);
        // verify modal opens
        const modal = screen.queryByTestId('list-title-edit-modal');
        expect(modal).toBeInTheDocument();
        // check current title
        const modalTitle = modal.querySelector('[data-testid="list-title-in-modal"]');
        expect(modalTitle).toBeInTheDocument();
        expect(modalTitle.textContent).toContain('List 1');
        unmount();
    });
    it('Modal window contains close icon', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // click edit icon button
        fireEvent.click(editIcon);
        // verify modal opens
        const modal = screen.queryByTestId('list-title-edit-modal');
        expect(modal).toBeInTheDocument();
        // check current title
        const modalTitle = modal.querySelector('[data-testid="list-title-in-modal"]');
        expect(modalTitle).toBeInTheDocument();
        expect(modalTitle.textContent).toContain('List 1');
        // check close icon
        const modalCloseIcon = modal.querySelector('[data-testid="list-title-edit-modal-close"]');
        expect(modalCloseIcon).toBeInTheDocument();
        unmount();
    });
    it('Modal window contains text input', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // click edit icon button
        fireEvent.click(editIcon);
        // verify modal opens
        const modal = screen.queryByTestId('list-title-edit-modal');
        expect(modal).toBeInTheDocument();
        // check current title
        const modalTitle = modal.querySelector('[data-testid="list-title-in-modal"]');
        expect(modalTitle).toBeInTheDocument();
        expect(modalTitle.textContent).toContain('List 1');
        // check close icon
        const modalCloseIcon = modal.querySelector('[data-testid="list-title-edit-modal-close"]');
        expect( modalCloseIcon).toBeInTheDocument();
        // check text input
        const modalTextInput = modal.querySelector('[data-testid="list-title-edit-input"]');
        expect(modalTextInput).toBeInTheDocument();
        unmount();
    });
    it('Modal window contains button to update the title of the list', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // click edit icon button
        fireEvent.click(editIcon);
        // verify modal opens
        const modal = screen.queryByTestId('list-title-edit-modal');
        expect(modal).toBeInTheDocument();
        // check current title
        const modalTitle = modal.querySelector('[data-testid="list-title-in-modal"]');
        expect(modalTitle).toBeInTheDocument();
        expect(modalTitle.textContent).toContain('List 1');
        // check close icon
        const modalCloseIcon = modal.querySelector('[data-testid="list-title-edit-modal-close"]');
        expect( modalCloseIcon).toBeInTheDocument();
        // check text input
        const modalTextInput = modal.querySelector('[data-testid="list-title-edit-input"]');
        expect(modalTextInput).toBeInTheDocument();
        // check button to update list title
        const modalListTitleUpdateButton = modal.querySelector('[data-testid="edit-list-title-button"]');
        expect(modalListTitleUpdateButton).toBeInTheDocument();
        unmount();
    });
    it('Button to update the title of the list within the modal window is titled appropriately', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // click edit icon button
        fireEvent.click(editIcon);
        // verify modal opens
        const modal = screen.queryByTestId('list-title-edit-modal');
        expect(modal).toBeInTheDocument();
        // check current title
        const modalTitle = modal.querySelector('[data-testid="list-title-in-modal"]');
        expect(modalTitle).toBeInTheDocument();
        expect(modalTitle.textContent).toContain('List 1');
        // check close icon
        const modalCloseIcon = modal.querySelector('[data-testid="list-title-edit-modal-close"]');
        expect( modalCloseIcon).toBeInTheDocument();
        // check text input
        const modalTextInput = modal.querySelector('[data-testid="list-title-edit-input"]');
        expect(modalTextInput).toBeInTheDocument();
        // check button to update list title
        const modalListTitleUpdateButton = modal.querySelector('[data-testid="edit-list-title-button"]');
        expect(modalListTitleUpdateButton).toBeInTheDocument();
        expect(modalListTitleUpdateButton.textContent.trim()).toBe("Update list name");
        unmount();
    });
    it('Text input within the modal window is registering text changes', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // click edit icon button
        fireEvent.click(editIcon);
        // verify modal opens
        const modal = screen.queryByTestId('list-title-edit-modal');
        expect(modal).toBeInTheDocument();
        // check current title
        const modalTitle = modal.querySelector('[data-testid="list-title-in-modal"]');
        expect(modalTitle).toBeInTheDocument();
        expect(modalTitle.textContent).toContain('List 1');
        // check close icon
        const modalCloseIcon = modal.querySelector('[data-testid="list-title-edit-modal-close"]');
        expect( modalCloseIcon).toBeInTheDocument();
        // check text input registers changes
        const modalTextInput = modal.querySelector('[data-testid="list-title-edit-input"]');
        expect(modalTextInput).toBeInTheDocument();
        fireEvent.change(modalTextInput, { target: { value: 'Updated list 1' } });
        expect(modalTextInput.value).toBe('Updated list 1');
        unmount();
    });
    it('Clicking the close icon within the modal window closes the modal', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // click edit icon button
        fireEvent.click(editIcon);
        // verify modal opens
        const modal = screen.queryByTestId('list-title-edit-modal');
        expect(modal).toBeInTheDocument();
        // check current title
        const modalTitle = modal.querySelector('[data-testid="list-title-in-modal"]');
        expect(modalTitle).toBeInTheDocument();
        expect(modalTitle.textContent).toContain('List 1');
        // check close icon
        const modalCloseIcon = modal.querySelector('[data-testid="list-title-edit-modal-close"]');
        expect(modalCloseIcon).toBeInTheDocument();
        // click the close icon
        fireEvent.click(modalCloseIcon);
        expect(screen.queryByTestId('list-title-edit-modal')).toBeNull();
        unmount();
    });
    it('Clicking the "Update list name" button while text input is empty displays an alert', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // click edit icon button
        fireEvent.click(editIcon);
        // verify modal opens
        const modal = screen.queryByTestId('list-title-edit-modal');
        expect(modal).toBeInTheDocument();
        // check current title
        const modalTitle = modal.querySelector('[data-testid="list-title-in-modal"]');
        expect(modalTitle).toBeInTheDocument();
        expect(modalTitle.textContent).toContain('List 1');
        // check close icon
        const modalCloseIcon = modal.querySelector('[data-testid="list-title-edit-modal-close"]');
        expect( modalCloseIcon).toBeInTheDocument();
        // check text input
        const modalTextInput = modal.querySelector('[data-testid="list-title-edit-input"]');
        expect(modalTextInput).toBeInTheDocument();
        // check button to update list title
        const modalListTitleUpdateButton = modal.querySelector('[data-testid="edit-list-title-button"]');
        expect(modalListTitleUpdateButton).toBeInTheDocument();
        expect(modalListTitleUpdateButton.textContent.trim()).toBe("Update list name");
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
        fireEvent.click(modalListTitleUpdateButton);
        expect(alertMock).toHaveBeenCalledWith('Please enter updated list name');
        alertMock.mockRestore();
        unmount();
    });
    it('Clicking the "Update list name" button while text input is non-empty updates the list title successfully', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // click edit icon button
        fireEvent.click(editIcon);
        // verify modal opens
        const modal = screen.queryByTestId('list-title-edit-modal');
        expect(modal).toBeInTheDocument();
        // check current title
        const modalTitle = modal.querySelector('[data-testid="list-title-in-modal"]');
        expect(modalTitle).toBeInTheDocument();
        expect(modalTitle.textContent).toContain('List 1');
        // check close icon
        const modalCloseIcon = modal.querySelector('[data-testid="list-title-edit-modal-close"]');
        expect( modalCloseIcon).toBeInTheDocument();
        // check text input
        const modalTextInput = modal.querySelector('[data-testid="list-title-edit-input"]');
        expect(modalTextInput).toBeInTheDocument();
        fireEvent.change(modalTextInput, { target: { value: 'Updated list 1' } });
        expect(modalTextInput.value).toBe('Updated list 1');
        // check button to update list title
        const modalListTitleUpdateButton = modal.querySelector('[data-testid="edit-list-title-button"]');
        expect(modalListTitleUpdateButton).toBeInTheDocument();
        expect(modalListTitleUpdateButton.textContent.trim()).toBe("Update list name");
        await act( async () => fireEvent.click(modalListTitleUpdateButton));
        // verify list title has been updated
        expect(listTitle.textContent.trim()).toBe('Updated list 1');
        unmount();
    });
    it('Updated list title is reflected within the modal window', async () => {
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
        // verifying list title
        const listTitle = listElements[0].querySelector('[data-testid="list-title"]');
        expect(listTitle).toBeInTheDocument();
        expect(listTitle.textContent.trim()).toBe('List 1');
        // verifying list title edit icon
        const editIcon = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIcon).toBeInTheDocument();
        // click edit icon button
        fireEvent.click(editIcon);
        // verify modal opens
        const modal = screen.queryByTestId('list-title-edit-modal');
        expect(modal).toBeInTheDocument();
        // check current title
        const modalTitle = modal.querySelector('[data-testid="list-title-in-modal"]');
        expect(modalTitle).toBeInTheDocument();
        expect(modalTitle.textContent).toContain('List 1');
        // check close icon
        const modalCloseIcon = modal.querySelector('[data-testid="list-title-edit-modal-close"]');
        expect( modalCloseIcon).toBeInTheDocument();
        // check text input
        const modalTextInput = modal.querySelector('[data-testid="list-title-edit-input"]');
        expect(modalTextInput).toBeInTheDocument();
        fireEvent.change(modalTextInput, { target: { value: 'Updated list 1' } });
        expect(modalTextInput.value).toBe('Updated list 1');
        // check button to update list title
        const modalListTitleUpdateButton = modal.querySelector('[data-testid="edit-list-title-button"]');
        expect(modalListTitleUpdateButton).toBeInTheDocument();
        expect(modalListTitleUpdateButton.textContent.trim()).toBe("Update list name");
        await act( async () => fireEvent.click(modalListTitleUpdateButton));
        // verify list title has been updated
        expect(listTitle.textContent.trim()).toBe('Updated list 1');
        // click list edit icon again
        const editIconn = listElements[0].querySelector('[data-testid="list-title-edit"]');
        expect(editIconn).toBeInTheDocument();
        fireEvent.click(editIconn);
        // Open modal again
        const modall = screen.queryByTestId('list-title-edit-modal');
        expect(modall).toBeInTheDocument();
        // check current title again
        const modalTitlee = modall.querySelector('[data-testid="list-title-in-modal"]');
        expect(modalTitlee).toBeInTheDocument();
        expect(modalTitlee.textContent).toContain('Updated list 1');
        unmount();
    });
    it('Create multiple lists, verify their titles, and verify their order of addition', async () => {
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
        unmount();
    });
});