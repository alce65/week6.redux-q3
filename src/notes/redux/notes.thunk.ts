import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiNotesRepository } from '../services/api.notes.repository';
import { Note, NoteNoId } from '../../model/note';

// Thunk -> función devuelve un actionCreator
// Parámetros
// - nombre acción
// - function action creator

// Tipado
// - retorno de la función -> payload de la acción síncrona
// - parámetros de la función

export const loadThunk = createAsyncThunk<Note[], ApiNotesRepository>(
  'notes/load',
  async (repo) => {
    const notes = await repo.getAll();
    return notes;
  }
);

export const addThunk = createAsyncThunk<
  Note,
  {
    repo: ApiNotesRepository;
    note: NoteNoId;
  }
>('notes/add', async ({ repo, note }) => {
  const fullNote = await repo.create(note);
  return fullNote;
});

export const updateThunk = createAsyncThunk<
  Note,
  {
    repo: ApiNotesRepository;
    note: Note;
  }
>('notes/update', async ({ repo, note }) => {
  const updatedNote = await repo.update(note.id, note);
  return updatedNote;
});

export const eraseThunk = createAsyncThunk<
  Note['id'],
  {
    repo: ApiNotesRepository;
    note: Note;
  }
>('notes/erase', async ({ repo, note }) => {
  await repo.delete(note.id);
  return note.id;
});
