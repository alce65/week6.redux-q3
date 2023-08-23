import { useCallback, useMemo } from 'react';
import { Note, NoteNoId } from '../../model/note';
import { ApiNotesRepository } from '../services/api.notes.repository';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

import {
  addThunk,
  eraseThunk,
  loadThunk,
  updateThunk,
} from '../redux/notes.thunk';

export const urlBase = 'http://localhost:3000/notes';

export function useNotes() {
  const repo = useMemo(() => new ApiNotesRepository(urlBase), []);

  //const [notes, setNotes] = useState<Note[]>([]);

  const notesState = useSelector((state: RootState) => state.notesState);
  const dispatch = useDispatch<AppDispatch>();

  // Ejecuta el callback
  // una vez al renderizar el componente por vez primera
  // cada vez que cambie una variable del array de dependencias
  const loadNotes = useCallback(async () => {
    dispatch(loadThunk(repo));
  }, [repo, dispatch]);

  const add = async (note: NoteNoId) => {
    dispatch(addThunk({ repo, note }));
  };

  const update = async (note: Note) => {
    dispatch(updateThunk({ repo, note }));
  };

  const erase = async (note: Note) => {
    dispatch(eraseThunk({ repo, note }));
  };

  return {
    notes: notesState.notes,
    loadState: notesState.loadState,
    error: notesState.error,
    loadNotes,
    add,
    update,
    erase,
  };
}
