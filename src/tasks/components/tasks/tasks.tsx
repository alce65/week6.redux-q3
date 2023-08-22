import { useEffect } from 'react';
import { Add } from '../add/add';
import { Card } from '../card/card';
import './tasks.scss';

import { useTasks } from '../../hooks/use.tasks';

export function Tasks() {
  console.log('Ejecutando Tasks');

  const { tasks, loadState, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <section id="tasks" className="tasks">
      <h2>Tareas</h2>
      <div className="add-container">
        <Add></Add>
      </div>

      {loadState === 'loading' && <p>Loading...</p>}

      {loadState === 'loaded' && (
        <ul className="cards-container">
          {tasks.map((item) => (
            <Card key={item.id} task={item}></Card>
          ))}
        </ul>
      )}
    </section>
  );
}
