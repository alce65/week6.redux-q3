// Creadores de acciones

import { Reducer } from '@reduxjs/toolkit';

type NoPayloadAction = {
  type: 'counter@increment' | 'counter@decrement';
};

type PayloadAction = {
  type: 'counter@incrementByAmount';
  payload: number;
};

type CounterActions = NoPayloadAction | PayloadAction;

export const incrementActionCreator = (): CounterActions => ({
  type: 'counter@increment',
});

export const decrementActionCreator = (): CounterActions => ({
  type: 'counter@decrement',
});

export const incrementByAmountActionCreator = (
  payload: number
): CounterActions => ({
  type: 'counter@incrementByAmount',
  payload,
});

// state & reducer

export type CounterState = {
  value: number;
  status: 'idle' | 'loading' | 'failed';
};

export const oldCounterReducer: Reducer<CounterState, CounterActions> = (
  state: CounterState | undefined,
  action: CounterActions
): CounterState => {
  if (!state) throw new Error('Np state received');
  switch (action.type) {
    case 'counter@increment':
      return { ...state, value: state.value + 1 };
    case 'counter@decrement':
      return { ...state, value: state.value - 1 };
    case 'counter@incrementByAmount':
      return { ...state, value: state.value + action.payload };
    default:
      return { ...state };
  }
};
