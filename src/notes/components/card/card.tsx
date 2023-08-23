import { Note } from '../../../model/note';
import { useNotes } from '../../hooks/use.notes';

type Props = {
  note: Note;
};
export function Card({ note }: Props) {
  const { update, erase } = useNotes();

  const handleChange = () => {
    const updateNote = { ...note, isImportant: !note.isImportant };
    update(updateNote);
  };

  const onClick = () => erase(note);

  return (
    <li>
      <span>{note.title}</span>
      <span>{note.author}</span>
      <span>
        <input
          type="checkbox"
          name="is-important"
          checked={note.isImportant}
          onChange={handleChange}
        />
        <span role="button" className="button" onClick={onClick}>
          🗑️
        </span>
      </span>
    </li>
  );
}
