import { Task } from '../../model/task';
import taskReducer, { TasksState, actions } from './tasks.slice';

describe('Given the reducer taskReducer', () => {
  describe('When it receive a load action', () => {
    test('the state should include the payload', () => {
      const mockTasks: Task[] = [];
      const initialState: TasksState = {
        tasks: [],
        loadState: 'loading',
      };
      const action = actions.load(mockTasks);
      const result = taskReducer(initialState, action);
      expect(result.tasks).toEqual(action.payload);
      expect(result.loadState).toBe('loaded');
    });
  });

  describe('When it receive a create action', () => {
    test('the state should include the payload', () => {
      const mockTask: Task = {
        id: 12,
      } as Task;
      const initialState: TasksState = {
        tasks: [],
        loadState: 'loading',
      };
      const action = actions.create(mockTask);

      const result = taskReducer(initialState, action);
      expect(result.tasks).toEqual([action.payload]);
    });
  });
});
