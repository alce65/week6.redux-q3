import { useCallback, useMemo } from 'react';
import { Task, TaskNoId } from '../../model/task';
import { ApiTasksRepository } from '../services/api.tasks.repository';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

import { actions } from '../redux/tasks.slice';

export const urlBase = 'http://localhost:3000/tasks';

export function useTasks() {
  const repo = useMemo(() => new ApiTasksRepository(urlBase), []);

  //const [tasks, setTasks] = useState<Task[]>([]);

  const tasksState = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  // Ejecuta el callback
  // una vez al renderizar el componente por vez primera
  // cada vez que cambie una variable del array de dependencias
  const loadTasks = useCallback(async () => {
    try {
      const tasks = await repo.getAll();
      dispatch(actions.load(tasks));
      console.log('Load tasks');
    } catch (error) {
      console.error((error as Error).message);
    }
  }, [repo, dispatch]);

  const add = async (task: TaskNoId) => {
    try {
      // 1 - Asíncrono : repo
      const fullTask = await repo.create(task);
      // 2 - Síncrono: State
      dispatch(actions.create(fullTask));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const update = async (task: Task) => {
    try {
      // 1 - Asíncrono : repo
      const updatedTask = await repo.update(task.id, task);
      // 2 - Síncrono: State
      dispatch(actions.update(updatedTask));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const erase = async (task: Task) => {
    try {
      await repo.delete(task.id);
      dispatch(actions.delete(task.id));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return {
    tasks: tasksState.tasks,
    loadState: tasksState.loadState,
    loadTasks,
    add,
    update,
    erase,
  };
}
