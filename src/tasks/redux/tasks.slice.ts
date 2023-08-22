import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../../model/task';

export type TasksState = {
  tasks: Task[];
  loadState: 'loading' | 'loaded' | 'idle';
};

const initialState: TasksState = {
  tasks: [],
  loadState: 'loading',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    load: (state, { payload }: { payload: Task[] }) => {
      state.tasks = payload;
      state.loadState = 'loaded';
    },
    create: (state, { payload }: { payload: Task }) => {
      state.tasks.push(payload);
    },
    update: (state, { payload }: { payload: Task }) => {
      state.tasks = state.tasks.map((item) =>
        item.id === payload.id ? payload : item
      );
    },
    delete: (state, { payload }: { payload: Task['id'] }) => {
      state.tasks = state.tasks.filter((item) => item.id !== payload);
    },
  },
});

export const actions = tasksSlice.actions;
export default tasksSlice.reducer;

// actions

//load
//create
//update
//destroy
