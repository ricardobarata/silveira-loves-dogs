import { HttpErrorResponse } from "@angular/common/http";
import { Action, createReducer, on } from "@ngrx/store";
import { DogsData as DogData } from "src/app/app.models";
import { loadDog, loadDogFail, loadDogSuccess } from "../actions/app.actions";

export interface DogState {
  dog: DogData;
  loading: boolean;
  error: HttpErrorResponse;
}

export const initialState: DogState = {
  dog: null,
  loading: false,
  error: null
};

const _appReducer = createReducer(
  initialState,
  on(loadDog, state => ({
    ...state,
    dog: null,
    error: null,
    loading: true
  })),
  on(loadDogSuccess, (state, { data }) => ({
    ...state,
    dog: data,
    error: null,
    loading: false
  })),
  on(loadDogFail, (state, { error }) => ({
    ...state,
    dog: null,
    error: error,
    loading: false
  }))
);

export function appReducer(state: DogState | undefined, action: Action) {
  return _appReducer(state, action);
}
