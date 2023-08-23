import { createSlice } from '@reduxjs/toolkit';
import { Note } from '../../model/note';
import { addThunk, eraseThunk, loadThunk, updateThunk } from './notes.thunk';

export type NotesState = {
  notes: Note[];
  loadState: 'loading' | 'loaded' | 'idle' | 'error';
  error: Error | null;
};

const initialState: NotesState = {
  notes: [],
  loadState: 'idle',
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadThunk.pending, (state) => {
      state.loadState = 'loading';
    });
    builder.addCase(
      loadThunk.fulfilled,
      (state, { payload }: { payload: Note[] }) => {
        state.notes = payload;
        state.loadState = 'loaded';
      }
    );
    builder.addCase(loadThunk.rejected, (state) => {
      const error = new Error('Error loading notes');
      state.loadState = 'error';
      state.error = error;
    });
    builder.addCase(
      addThunk.fulfilled,
      (state, { payload }: { payload: Note }) => {
        state.notes.push(payload);
      }
    );
    builder.addCase(addThunk.rejected, (state) => {
      const error = new Error('Error creating notes');
      state.loadState = 'error';
      state.error = error;
    });
    builder.addCase(
      updateThunk.fulfilled,
      (state, { payload }: { payload: Note }) => {
        state.notes = state.notes.map((item) =>
          item.id === payload.id ? payload : item
        );
      }
    );
    builder.addCase(updateThunk.rejected, (state) => {
      const error = new Error('Error updating notes');
      state.loadState = 'error';
      state.error = error;
    });
    builder.addCase(
      eraseThunk.fulfilled,
      (state, { payload }: { payload: Note['id'] }) => {
        state.notes = state.notes.filter((item) => item.id !== payload);
      }
    );
    builder.addCase(eraseThunk.rejected, (state) => {
      const error = new Error('Error deleting notes');
      state.loadState = 'error';
      state.error = error;
    });
  },
});

export const actions = notesSlice.actions;
export default notesSlice.reducer;

// actions

//load
//create
//update
//destroy
