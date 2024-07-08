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
    it('"Create a new list" button exists', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        unmount();
    });
    it('"Create a new list" button is titled correctly', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        expect(listAddButton.textContent.trim()).toBe('Create a new list');
        unmount();
    });
    it('Modal window opens when "Create a new list" button is clicked', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        fireEvent.click(listAddButton);
        const modal = screen.queryByTestId('list-add-modal');
        expect(modal).toBeInTheDocument();
        unmount();
    });
    it('Modal window contains close icon', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        fireEvent.click(listAddButton);
        const modal = screen.queryByTestId('list-add-modal');
        expect(modal).toBeInTheDocument();
        const modalCloseIcon = screen.queryByTestId('list-add-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        unmount();
    });
    it('Modal window closes when close icon is clicked', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        fireEvent.click(listAddButton);
        const modal = screen.queryByTestId('list-add-modal');
        expect(modal).toBeInTheDocument();
        const modalCloseIcon = screen.queryByTestId('list-add-modal-close');
        expect(modalCloseIcon).toBeInTheDocument();
        fireEvent.click(modalCloseIcon);
        expect(screen.queryByTestId('list-add-modal')).toBeNull();
        unmount();
    });
    it('Modal window contains text input', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        fireEvent.click(listAddButton);
        const modal = screen.queryByTestId('list-add-modal');
        expect(modal).toBeInTheDocument();
        const listAddInput = screen.queryByTestId('list-add-input');
        expect(listAddInput).toBeInTheDocument();
        unmount();
    });
    it('Text input within the Modal window registers text changes', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        fireEvent.click(listAddButton);
        const modal = screen.queryByTestId('list-add-modal');
        expect(modal).toBeInTheDocument();
        const listAddInput = screen.queryByTestId('list-add-input');
        expect(listAddInput).toBeInTheDocument();
        fireEvent.change(listAddInput, { target: { value: 'List 1' } });
        expect(listAddInput.value).toBe('List 1');
        unmount();
    });
    it('Modal window contains "Create list" button', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        fireEvent.click(listAddButton);
        const modal = screen.queryByTestId('list-add-modal');
        expect(modal).toBeInTheDocument();
        const createListButton = screen.queryByTestId('create-list-button');
        expect(createListButton).toBeInTheDocument();
        unmount();
    });
    it('"Create list" button within the Modal window is titled correctly', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        fireEvent.click(listAddButton);
        const modal = screen.queryByTestId('list-add-modal');
        expect(modal).toBeInTheDocument();
        const createListButton = screen.queryByTestId('create-list-button');
        expect(createListButton).toBeInTheDocument();
        expect(createListButton.textContent.trim()).toBe('Create list');
        unmount();
    });
    it('"Create list" button within the Modal window display an alert when clicked while text input is empty', () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        fireEvent.click(listAddButton);
        const modal = screen.queryByTestId('list-add-modal');
        expect(modal).toBeInTheDocument();
        const createListButton = screen.queryByTestId('create-list-button');
        expect(createListButton).toBeInTheDocument();
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
        fireEvent.click(createListButton);
        expect(alertMock).toHaveBeenCalledWith('Please enter a list name');
        alertMock.mockRestore();
        unmount();
    });
    it('Modal window closes when "Create list" button is clicked while text input is non-empty', async () => {
        const { unmount } = render(<Provider store={store}><App/></Provider>);
        const listAddButton = screen.queryByTestId('list-add');
        expect(listAddButton).toBeInTheDocument();
        fireEvent.click(listAddButton);
        const modal = screen.queryByTestId('list-add-modal');
        expect(modal).toBeInTheDocument();
        const listAddInput = screen.queryByTestId('list-add-input');
        expect(listAddInput).toBeInTheDocument();
        fireEvent.change(listAddInput, { target: { value: 'List 1' } });
        expect(listAddInput.value).toBe('List 1');
        const createListButton = screen.queryByTestId('create-list-button');
        expect(createListButton).toBeInTheDocument();
        await act( async () => fireEvent.click(createListButton));
        const modalAgain = screen.queryByTestId('list-add-modal');
        expect(modalAgain).toBeNull();
        unmount();
    });
});