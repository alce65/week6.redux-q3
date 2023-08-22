import { Task } from '../../../model/task';
import { useTasks } from '../../hooks/use.tasks';

type Props = {
  task: Task;
};
export function Card({ task }: Props) {
  const { update, erase } = useTasks();
  const handleChange = () => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    update(updatedTask);
  };

  const onClick = () => erase(task);

  return (
    <li>
      <span>{task.title}</span>
      <span>{task.owner}</span>
      <span>
        <input
          type="checkbox"
          name="is-completed"
          checked={task.isCompleted}
          onChange={handleChange}
        />
        <span role="button" className="button" onClick={onClick}>
          🗑️
        </span>
      </span>
    </li>
  );
}
