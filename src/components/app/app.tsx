import { Counter } from '../../counter/components/counter/counter';
import { ListNotes } from '../../notes/components/list.notes/list.notes';
import { Tasks } from '../../tasks/components/tasks/tasks';

export function App() {
  return (
    <>
      <Counter></Counter>
      <Tasks></Tasks>
      <ListNotes></ListNotes>
    </>
  );
}
