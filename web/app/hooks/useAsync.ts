// TODO: ditch this for React Query when we need it

import { useReducer, useCallback } from 'react';

type AsyncState<T> = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  data?: T;
  error?: Error;
};

type AsyncAction<T> =
  | { type: 'pending' }
  | { type: 'resolved'; data: T }
  | { type: 'rejected'; error: Error };

const asyncReducer =
  (keepPrevious?: boolean) =>
  <T>(givenState: AsyncState<T>, action: AsyncAction<T>): AsyncState<T> => {
    // decide if we should keep the last state or not
    const state = keepPrevious ? givenState : {};
    switch (action.type) {
      case 'pending': {
        return { ...state, status: 'pending', error: undefined };
      }
      case 'resolved': {
        return { status: 'resolved', data: action.data, error: undefined };
      }
      case 'rejected': {
        return { status: 'rejected', data: undefined, error: action.error };
      }
    }
  };

type Props<T> = {
  initialState?: AsyncState<T>;
  keepPreviousDataOnLoad?: boolean;
};

type Return<T> = {
  isFetching: boolean;
  isErrored: boolean;
  isSuccessful: boolean;
  data?: T;
  error?: Error;
  runAsync: (promise: Promise<T>) => void;
};
export default function useAsync<T>({
  initialState,
  keepPreviousDataOnLoad,
}: Props<T>): Return<T> {
  const _initialState: AsyncState<T> = {
    status: 'idle',
    ...initialState,
  };

  const [state, dispatch] = useReducer(
    asyncReducer(keepPreviousDataOnLoad),
    _initialState,
  );

  const runAsync = useCallback((promise: Promise<T>) => {
    dispatch({ type: 'pending' });
    promise.then(
      // this is designed to parse axios format for async calls
      // if the promise doesn't return {data} this will throw error
      // we can enhance this but we will ditch this for SWR anyways
      data => dispatch({ type: 'resolved', data }),
      error => dispatch({ type: 'rejected', error }),
    );
  }, []);

  return {
    isFetching: state.status === 'pending',
    isErrored: state.status === 'rejected',
    isSuccessful: state.status === 'resolved',
    // FIXME: this is not type safe
    data: state.data as T,
    error: state.error,
    runAsync,
  };
}
