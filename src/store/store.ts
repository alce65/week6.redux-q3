import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { counterReducer } from '../counter/redux/counter.slice';
// import { oldCounterReducer } from '../counter/redux/counter.old';
import tasksReducer from '../tasks/redux/tasks.slice';

export const appStore = configureStore({
  reducer: {
    counter: counterReducer,
    // oldCounter: oldCounterReducer,
    tasks: tasksReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
