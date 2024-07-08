import boardReducer, { 
    createNewListReducer,
    createNewTaskReducer,
    deleteListReducer,
    deleteTaskReducer,
    editListTitleReducer,
    editTaskReducer,
    dragReducer
} from '../boardSlice.js';
import { v4 as uuidv4 } from 'uuid';

describe('createNewListReducer', () => {
    it('createNewListReducer: Maintain immutability of the state', () => {
        const initialState = {
            lists: []
        };
        const action = createNewListReducer({ listTitle: 'New List' });
        const newState = boardReducer(initialState, action);
        expect(newState).not.toBe(initialState);
    });
    it('createNewListReducer: State update should have the lists property', () => {
        const initialState = {
            lists: []
        };
        const action = createNewListReducer({ listTitle: 'New List' });
        const newState = boardReducer(initialState, action);
        expect(newState).toHaveProperty('lists');
    });
    it('createNewListReducer: Returned state should only have the lists property', () => {
        const initialState = {
            lists: []
        };
        const action = createNewListReducer({ listTitle: 'New List' });
        const newState = boardReducer(initialState, action);
        const propertyNames = Object.keys(newState);
        expect(propertyNames).toEqual(['lists']);
    });
    it('createNewListReducer: Reducer should add a new list to the initial state', () => {
        const initialState = {
            lists: []
        };
        const action = createNewListReducer({listTitle: 'New List'});
        const output = boardReducer(initialState, action)
        expect(output.lists).toHaveLength(1);
    });
    it('createNewListReducer: Added new list should have properties listId, listTitle, and tasks', () => {
        const initialState = {
            lists: []
        };
        const action = createNewListReducer({listTitle: 'New List'});
        const output = boardReducer(initialState, action)
        expect(output.lists[0]).toHaveProperty('listId');
        expect(output.lists[0]).toHaveProperty('listTitle', 'New List');
        expect(output.lists[0]).toHaveProperty('tasks', []);
    });
    it('createNewListReducer: Adding multiple lists', () => {
        const initialState = {
            lists: []
        };
        const numListsToAdd = 20;
        let currentState = initialState;
        for (let i = 1; i <= numListsToAdd; i++) {
            const listTitle = `List ${i}`;
            const action = createNewListReducer({ listTitle: listTitle });
            currentState = boardReducer(currentState, action);
        }
        expect(currentState.lists).toHaveLength(numListsToAdd);
        for (let i = 0; i < numListsToAdd; i++) {
            const expectedTitle = `List ${i + 1}`;
            expect(currentState.lists[i]).toHaveProperty('listId');
            expect(currentState.lists[i]).toHaveProperty('listTitle', expectedTitle);
            expect(currentState.lists[i]).toHaveProperty('tasks', []);
        }
    });
});

describe('createNewTaskReducer', () => {
    it('createNewTaskReducer: Maintain immutability of the state', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = createNewTaskReducer({ listId: sampleId, taskTitle: 'New Task' });
        const newState = boardReducer(initialState, action);
        expect(newState).not.toBe(initialState);
    });
    it('createNewTaskReducer: State update should have the lists property', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = createNewTaskReducer({ listId: sampleId, taskTitle: 'New Task' });
        const newState = boardReducer(initialState, action);
        expect(newState).toHaveProperty('lists');
    });
    it('createNewTaskReducer: Returned state should only have the lists property', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = createNewTaskReducer({ listId: sampleId, taskTitle: 'New Task' });
        const newState = boardReducer(initialState, action);
        const propertyNames = Object.keys(newState);
        expect(propertyNames).toEqual(['lists']);
    });
    it('createNewTaskReducer: Reducer should add a new task to the list with the provided listId', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = createNewTaskReducer({ listId: sampleId, taskTitle: 'New Task' });
        const newState = boardReducer(initialState, action);
        expect(newState.lists).toHaveLength(1);
        expect(newState.lists[0]).toHaveProperty('listId');
        expect(newState.lists[0]).toHaveProperty('listTitle', 'New List');
        expect(newState.lists[0]).toHaveProperty('tasks');
        expect(newState.lists[0].tasks).toHaveLength(1);
    });
    it('createNewTaskReducer: Added new task should have properties taskId, taskTitle, and taskDescription', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = createNewTaskReducer({ listId: sampleId, taskTitle: 'New Task' });
        const newState = boardReducer(initialState, action);
        expect(newState.lists[0].tasks[0]).toHaveProperty('taskId');
        expect(newState.lists[0].tasks[0]).toHaveProperty('taskTitle', 'New Task');
        expect(newState.lists[0].tasks[0]).toHaveProperty('taskDescription', '');
    });
    it('createNewTaskReducer: Adding multiple lists and multiple tasks in those lists', () => {
        const initialState = {
            lists: []
        };
        const numListsToAdd = 20;
        let currentState = initialState;
        let sampleIds = [];
        // Add lists and store their IDs
        for (let i = 1; i <= numListsToAdd; i++) {
            const listTitle = `List ${i}`;
            const action = createNewListReducer({listTitle: listTitle});
            currentState = boardReducer(currentState, action);
            sampleIds.push(currentState.lists[i - 1].listId);
        }
        // Add tasks to each list
        const numTasksToAdd = 5;
        for (const listId of sampleIds) {
            for (let i = 1; i <= numTasksToAdd; i++) {
                const taskTitle = `Task ${i}`;
                const action = createNewTaskReducer({ listId: listId, taskTitle: taskTitle });
                currentState = boardReducer(currentState, action);
            }
        }
        // Verify the tasks were added and their order
        for (const listId of sampleIds) {
            const list = currentState.lists.find((list) => list.listId === listId);
            expect(list.tasks).toHaveLength(numTasksToAdd);
            let taskCounter = 1;
            for (const task of list.tasks) {
                const expectedTaskTitle = `Task ${taskCounter}`;
                expect(task.taskTitle).toBe(expectedTaskTitle);
                taskCounter++;
            }
        }
    });
});

describe('deleteListReducer', () => {
    it('deleteListReducer: Maintain immutability of the state', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = deleteListReducer({ listId: sampleId });
        const newState = boardReducer(initialState, action);
        expect(newState).not.toBe(initialState);
    });
    it('deleteListReducer: State update should have the lists property', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = deleteListReducer({ listId: sampleId });
        const newState = boardReducer(initialState, action);
        expect(newState).toHaveProperty('lists');
    });
    it('deleteListReducer: Returned state should only have the lists property', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = deleteListReducer({ listId: sampleId });
        const newState = boardReducer(initialState, action);
        const propertyNames = Object.keys(newState);
        expect(propertyNames).toEqual(['lists']);
    });
    it('deleteListReducer: Reducer should delete the list with the provided listId', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = deleteListReducer({ listId: sampleId });
        const newState = boardReducer(initialState, action);
        expect(newState.lists).toHaveLength(0);
    });
    it('deleteListReducer: Adding multiple lists and then deleting randomly', () => {
        const initialState = {
            lists: []
        };
        const numListsToAdd = 20;
        let currentState = initialState;
        let sampleIds = [];
        // Add lists and store their IDs
        for (let i = 1; i <= numListsToAdd; i++) {
            const listTitle = `List ${i}`;
            const action = createNewListReducer({listTitle: listTitle});
            currentState = boardReducer(currentState, action);
            sampleIds.push(currentState.lists[i - 1].listId);
        }
        // Randomly delete lists while verifying the order
        while (sampleIds.length > 0) {
            // Randomly select a list to delete
            const randomIndex = Math.floor(Math.random() * sampleIds.length);
            const listIdToDelete = sampleIds[randomIndex];
            // Delete the selected list
            const deleteAction = deleteListReducer({ listId: listIdToDelete });
            currentState = boardReducer(currentState, deleteAction);
            // Verify the order of remaining lists
            const remainingListIds = currentState.lists.map((list) => list.listId);
            const expectedOrder = sampleIds.filter((id) => id !== listIdToDelete);
            expect(remainingListIds).toEqual(expectedOrder);
            // Remove the deleted list from the sampleIds array
            sampleIds.splice(randomIndex, 1);
        }
    });
});

describe('deleteTaskReducer', () => {
    it('deleteTaskReducer: Maintain immutability of the state', () => {
        const sampleListId = uuidv4();
        const sampleTaskId = uuidv4();
        const initialState = {
            lists: [
                {
                    listId: sampleListId, 
                    listTitle: 'New List', 
                    tasks: [{taskId: sampleTaskId, taskTitle: 'New Task', taskDescription: ''}]
                }
            ]
        };
        const action = deleteTaskReducer({ listId: sampleListId, taskId: sampleTaskId });
        const newState = boardReducer(initialState, action);
        expect(newState).not.toBe(initialState);
    });
    it('deleteTaskReducer: State update should have the lists property', () => {
        const sampleListId = uuidv4();
        const sampleTaskId = uuidv4();
        const initialState = {
            lists: [
                {
                    listId: sampleListId, 
                    listTitle: 'New List', 
                    tasks: [{taskId: sampleTaskId, taskTitle: 'New Task', taskDescription: ''}]
                }
            ]
        };
        const action = deleteTaskReducer({ listId: sampleListId, taskId: sampleTaskId });
        const newState = boardReducer(initialState, action);
        expect(newState).toHaveProperty('lists');
    });
    it('deleteTaskReducer: Returned state should only have the lists property', () => {
        const sampleListId = uuidv4();
        const sampleTaskId = uuidv4();
        const initialState = {
            lists: [
                {
                    listId: sampleListId, 
                    listTitle: 'New List', 
                    tasks: [{taskId: sampleTaskId, taskTitle: 'New Task', taskDescription: ''}]
                }
            ]
        };
        const action = deleteTaskReducer({ listId: sampleListId, taskId: sampleTaskId });
        const newState = boardReducer(initialState, action);
        const propertyNames = Object.keys(newState);
        expect(propertyNames).toEqual(['lists']);
    });
    it('deleteTaskReducer: Reducer should delete task with the provided listId and taskId', () => {
        const sampleListId = uuidv4();
        const sampleTaskId = uuidv4();
        const initialState = {
            lists: [
                {
                    listId: sampleListId, 
                    listTitle: 'New List', 
                    tasks: [{taskId: sampleTaskId, taskTitle: 'New Task', taskDescription: ''}]
                }
            ]
        };
        const action = deleteTaskReducer({ listId: sampleListId, taskId: sampleTaskId });
        const newState = boardReducer(initialState, action);
        expect(newState.lists).toHaveLength(1);
        expect(newState.lists[0]).toHaveProperty('listId');
        expect(newState.lists[0]).toHaveProperty('listTitle', 'New List');
        expect(newState.lists[0]).toHaveProperty('tasks', []);
        expect(newState.lists[0].tasks).toHaveLength(0);
    });
    it('deleteTaskReducer: Adding multiple lists and multiple tasks in those lists and then deleting tasks randomly', () => {
        const initialState = {
            lists: []
        };
        const numListsToAdd = 20;
        let currentState = initialState;
        let listData = []; // To store listId and associated taskIds
        const numTasksToAdd = 5;
        // Add lists and store their IDs
        for (let i = 1; i <= numListsToAdd; i++) {
            const listTitle = `List ${i}`;
            const action = createNewListReducer({listTitle: listTitle});
            currentState = boardReducer(currentState, action);
            const listId = currentState.lists[i - 1].listId;
            const taskIds = [];
            // Add tasks to each list and store taskIds
            for (let j = 1; j <= numTasksToAdd; j++) {
                const taskTitle = `Task ${j}`;
                const taskAction = createNewTaskReducer({ listId: listId, taskTitle: taskTitle });
                currentState = boardReducer(currentState, taskAction);
                taskIds.push(currentState.lists.find((list) => list.listId === listId).tasks[j - 1].taskId);
            }
            listData.push({ listId: listId, taskIds: taskIds });
        }
        // Randomly delete tasks while verifying the order
        for (const list of listData) {
            while (list.taskIds.length > 0) {
                // Randomly select a task to delete
                const randomIndex = Math.floor(Math.random() * list.taskIds.length);
                const taskIdToDelete = list.taskIds[randomIndex];
                // Delete the selected task
                const deleteAction = deleteTaskReducer({ listId: list.listId, taskId: taskIdToDelete });
                currentState = boardReducer(currentState, deleteAction);
                // Verify the order of remaining tasks
                const remainingTaskIds = list.taskIds.filter((id) => id !== taskIdToDelete);
                expect(currentState.lists.find((listItem) => listItem.listId === list.listId).tasks.map((task) => task.taskId)).toEqual(remainingTaskIds);
                // Remove the deleted task from the taskIds array
                list.taskIds.splice(randomIndex, 1);
            }
        }
    });
});

describe('editListTitleReducer', () => {
    it('editListTitleReducer: Maintain immutability of the state', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = editListTitleReducer({ listId: sampleId, updatedListTitle: 'Updated New List' });
        const newState = boardReducer(initialState, action);
        expect(newState).not.toBe(initialState);
    });
    it('editListTitleReducer: State update should have the lists property', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = editListTitleReducer({ listId: sampleId, updatedListTitle: 'Updated New List' });
        const newState = boardReducer(initialState, action);
        expect(newState).toHaveProperty('lists');
    });
    it('editListTitleReducer: Returned state should only have the lists property', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = editListTitleReducer({ listId: sampleId, updatedListTitle: 'Updated New List' });
        const newState = boardReducer(initialState, action);
        const propertyNames = Object.keys(newState);
        expect(propertyNames).toEqual(['lists']);
    });
    it('editListTitleReducer: Reducer should update title of list with the provided listId', () => {
        const sampleId = uuidv4();
        const initialState = {
            lists: [{listId: sampleId, listTitle: 'New List', tasks: []}]
        };
        const action = editListTitleReducer({ listId: sampleId, updatedListTitle: 'Updated New List' });
        const newState = boardReducer(initialState, action);
        expect(newState.lists).toHaveLength(1);
        expect(newState.lists[0]).toHaveProperty('listId');
        expect(newState.lists[0]).toHaveProperty('listTitle', 'Updated New List');
        expect(newState.lists[0]).toHaveProperty('tasks', []);
        expect(newState.lists[0].tasks).toHaveLength(0);
    });
});

describe('editTaskReducer', () => {
    it('editTaskReducer: Maintain immutability of the state', () => {
        const sampleListId = uuidv4();
        const sampleTaskId = uuidv4();
        const initialState = {
            lists: [
                {
                    listId: sampleListId, 
                    listTitle: 'New List', 
                    tasks: [{taskId: sampleTaskId, taskTitle: 'New Task', taskDescription: ''}]
                }
            ]
        };
        const action = editTaskReducer({ listId: sampleListId, taskId: sampleTaskId, updatedTaskTitle: "Updated New Task", updatedTaskDescription: "Updated Description" });
        const newState = boardReducer(initialState, action);
        expect(newState).not.toBe(initialState);
    });
    it('editTaskReducer: State update should have the lists property', () => {
        const sampleListId = uuidv4();
        const sampleTaskId = uuidv4();
        const initialState = {
            lists: [
                {
                    listId: sampleListId, 
                    listTitle: 'New List', 
                    tasks: [{taskId: sampleTaskId, taskTitle: 'New Task', taskDescription: ''}]
                }
            ]
        };
        const action = editTaskReducer({ listId: sampleListId, taskId: sampleTaskId, updatedTaskTitle: "Updated New Task", updatedTaskDescription: "Updated Description" });
        const newState = boardReducer(initialState, action);
        expect(newState).toHaveProperty('lists');
    });
    it('editTaskReducer: Returned state should only have the lists property', () => {
        const sampleListId = uuidv4();
        const sampleTaskId = uuidv4();
        const initialState = {
            lists: [
                {
                    listId: sampleListId, 
                    listTitle: 'New List', 
                    tasks: [{taskId: sampleTaskId, taskTitle: 'New Task', taskDescription: ''}]
                }
            ]
        };
        const action = editTaskReducer({ listId: sampleListId, taskId: sampleTaskId, updatedTaskTitle: "Updated New Task", updatedTaskDescription: "Updated Description" });
        const newState = boardReducer(initialState, action);
        const propertyNames = Object.keys(newState);
        expect(propertyNames).toEqual(['lists']);
    });
    it('editTaskReducer: Reducer should edit taskTitle and taskDescription of provided taskId within provided listId', () => {
        const sampleListId = uuidv4();
        const sampleTaskId = uuidv4();
        const initialState = {
            lists: [
                {
                    listId: sampleListId, 
                    listTitle: 'New List', 
                    tasks: [{taskId: sampleTaskId, taskTitle: 'New Task', taskDescription: ''}]
                }
            ]
        };
        const action = editTaskReducer({ listId: sampleListId, taskId: sampleTaskId, updatedTaskTitle: "Updated New Task", updatedTaskDescription: "Updated Description" });
        const newState = boardReducer(initialState, action);
        expect(newState.lists).toHaveLength(1);
        expect(newState.lists[0]).toHaveProperty('listId');
        expect(newState.lists[0]).toHaveProperty('listTitle', 'New List');
        expect(newState.lists[0]).toHaveProperty('tasks');
        expect(newState.lists[0].tasks).toHaveLength(1);
        expect(newState.lists[0].tasks[0]).toHaveProperty('taskId');
        expect(newState.lists[0].tasks[0]).toHaveProperty('taskTitle', 'Updated New Task');
        expect(newState.lists[0].tasks[0]).toHaveProperty('taskDescription', 'Updated Description');
    });
});

describe('dragReducer', () => {
    it('dragReducer: Testing list drag', () => {
        const initialState = {
            lists: [
                {
                    listId: '564ac0b3-0d72-413b-adc0-14fdce3ba4d2',
                    listTitle: 'List 1',
                    tasks: [
                        {
                            taskId: 'fc1f8570-7041-4df0-9cb6-6d151133332e',
                            taskTitle: 'Task 1',
                            taskDescription: ''
                        },
                        {
                            taskId: '899fac4a-a415-41bb-b2a3-df8962d113a3',
                            taskTitle: 'Task 2',
                            taskDescription: ''
                        },
                        {
                            taskId: 'cae8a605-fe72-4d88-840c-1b753efa1291',
                            taskTitle: 'Task 3',
                            taskDescription: ''
                        }
                    ]
                },
                {
                    listId: '85f1c690-eccd-4c39-9cee-96b72aa6d01d',
                    listTitle: 'List 2',
                    tasks: [
                        {
                            taskId: 'fgc1f8570-7041-4df0-9cb6-6d151133332e',
                            taskTitle: 'Task 4',
                            taskDescription: ''
                        },
                        {
                            taskId: '8t99fac4a-a415-41bb-b2a3-df8962d113a3',
                            taskTitle: 'Task 5',
                            taskDescription: ''
                        },
                        {
                            taskId: 'ca34e8a605-fe72-4d88-840c-1b753efa1291',
                            taskTitle: 'Task 6',
                            taskDescription: ''
                        }
                    ]
                },
                {
                    listId: '0f88da06-00dd-42bb-9b95-c184ecfa4adc',
                    listTitle: 'List 3',
                    tasks: [
                        {
                            taskId: 'uu6fc1f8570-7041-4df0-9cb6-6d151133332e',
                            taskTitle: 'Task 7',
                            taskDescription: ''
                        },
                        {
                            taskId: '899facv4334a-a415-41bb-b2a3-df8962d113a3',
                            taskTitle: 'Task 8',
                            taskDescription: ''
                        },
                        {
                            taskId: '6cae8av12605-fe72-4d88-840c-1b753efa1291',
                            taskTitle: 'Task 9',
                            taskDescription: ''
                        }
                    ]
                }
            ]
        }
        let results = {
            source: { droppableId: 'boardDroppable', index: 0 },
            destination: { droppableId: 'boardDroppable', index: 0 },
            type: 'listDrag',
        };
        let action = dragReducer({ results: results });
        let newState = boardReducer(initialState, action);
        expect(newState).toEqual(initialState);
        results = {
            source: { droppableId: 'boardDroppable', index: 0 },
            destination: { droppableId: 'boardDroppable', index: 1 },
            type: 'listDrag',
        };
        action = dragReducer({ results: results });
        newState = boardReducer(newState, action);
        expect(newState.lists[0].listTitle).toBe('List 2');
        expect(newState.lists[1].listTitle).toBe('List 1');
        results = {
            source: { droppableId: 'boardDroppable', index: 0 },
            destination: { droppableId: 'boardDroppable', index: 2 },
            type: 'listDrag',
        };
        action = dragReducer({ results: results });
        newState = boardReducer(newState, action);
        expect(newState.lists[0].listTitle).toBe('List 1');
        expect(newState.lists[1].listTitle).toBe('List 3');
        expect(newState.lists[2].listTitle).toBe('List 2');
    });
    it('dragReducer: Testing task drag', () => {
        const initialState = {
            lists: [
                {
                    listId: '564ac0b3-0d72-413b-adc0-14fdce3ba4d2',
                    listTitle: 'List 1',
                    tasks: [
                        {
                            taskId: 'fc1f8570-7041-4df0-9cb6-6d151133332e',
                            taskTitle: 'Task 1',
                            taskDescription: ''
                        },
                        {
                            taskId: '899fac4a-a415-41bb-b2a3-df8962d113a3',
                            taskTitle: 'Task 2',
                            taskDescription: ''
                        },
                        {
                            taskId: 'cae8a605-fe72-4d88-840c-1b753efa1291',
                            taskTitle: 'Task 3',
                            taskDescription: ''
                        }
                    ]
                },
                {
                    listId: '85f1c690-eccd-4c39-9cee-96b72aa6d01d',
                    listTitle: 'List 2',
                    tasks: [
                        {
                            taskId: 'fgc1f8570-7041-4df0-9cb6-6d151133332e',
                            taskTitle: 'Task 4',
                            taskDescription: ''
                        },
                        {
                            taskId: '8t99fac4a-a415-41bb-b2a3-df8962d113a3',
                            taskTitle: 'Task 5',
                            taskDescription: ''
                        },
                        {
                            taskId: 'ca34e8a605-fe72-4d88-840c-1b753efa1291',
                            taskTitle: 'Task 6',
                            taskDescription: ''
                        }
                    ]
                },
                {
                    listId: '0f88da06-00dd-42bb-9b95-c184ecfa4adc',
                    listTitle: 'List 3',
                    tasks: [
                        {
                            taskId: 'uu6fc1f8570-7041-4df0-9cb6-6d151133332e',
                            taskTitle: 'Task 7',
                            taskDescription: ''
                        },
                        {
                            taskId: '899facv4334a-a415-41bb-b2a3-df8962d113a3',
                            taskTitle: 'Task 8',
                            taskDescription: ''
                        },
                        {
                            taskId: '6cae8av12605-fe72-4d88-840c-1b753efa1291',
                            taskTitle: 'Task 9',
                            taskDescription: ''
                        }
                    ]
                }
            ]
        }
        // task drag and drop at same position within the same list
        let results = {
            source: { droppableId: '0f88da06-00dd-42bb-9b95-c184ecfa4adc', index: 0 },
            destination: { droppableId: '0f88da06-00dd-42bb-9b95-c184ecfa4adc', index: 0 },
            type: 'taskDrag',
        };
        let action = dragReducer({ results: results });
        let newState = boardReducer(initialState, action);
        expect(newState).toEqual(initialState);
        // task drag and dropped within the same list
        results = {
            source: { droppableId: '0f88da06-00dd-42bb-9b95-c184ecfa4adc', index: 0 },
            destination: { droppableId: '0f88da06-00dd-42bb-9b95-c184ecfa4adc', index: 2 },
            type: 'taskDrag',
        };
        action = dragReducer({ results: results });
        newState = boardReducer(newState, action);
        expect(newState.lists[2].tasks[0].taskTitle).toBe('Task 8');
        expect(newState.lists[2].tasks[1].taskTitle).toBe('Task 9');
        expect(newState.lists[2].tasks[2].taskTitle).toBe('Task 7');
        // task drag and dropped to another list
        results = {
            source: { droppableId: '85f1c690-eccd-4c39-9cee-96b72aa6d01d', index: 0 },
            destination: { droppableId: '0f88da06-00dd-42bb-9b95-c184ecfa4adc', index: 1 },
            type: 'taskDrag',
        };
        action = dragReducer({ results: results });
        newState = boardReducer(newState, action);
        expect(newState.lists[1].tasks).toHaveLength(2);
        expect(newState.lists[2].tasks).toHaveLength(4);
        expect(newState.lists[1].tasks[0].taskTitle).toBe('Task 5');
        expect(newState.lists[1].tasks[1].taskTitle).toBe('Task 6');
        expect(newState.lists[2].tasks[0].taskTitle).toBe('Task 8');
        expect(newState.lists[2].tasks[1].taskTitle).toBe('Task 4');
        expect(newState.lists[2].tasks[2].taskTitle).toBe('Task 9');
        expect(newState.lists[2].tasks[3].taskTitle).toBe('Task 7');
    });
});