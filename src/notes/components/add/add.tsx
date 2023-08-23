import { SyntheticEvent } from 'react';
import { NoteNoId } from '../../../model/note';

import { useNotes } from '../../hooks/use.notes';

export function Add() {
  const { add } = useNotes();

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;

    const newNote: NoteNoId = {
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      author: (form.elements.namedItem('author') as HTMLInputElement).value,
      isImportant: false,
    };

    console.log(newNote);
    add(newNote);
  };

  return (
    <form aria-label="add-note" onSubmit={handleSubmit}>
      <legend>Añadir nota</legend>
      <input type="text" name="title" placeholder="Describe la nota" required />
      <input
        type="text"
        name="author"
        placeholder="Autor de la nota"
        required
      />
      <button type="submit">Añadir</button>
    </form>
  );
}
