import { createSelector } from "@ngrx/store";
import { DogState } from "../reducers/app.reducers";

export interface AppState {
  dogFeature: DogState;
}

export const selectDogFeature = (state: AppState) => state.dogFeature;

export const selectDog = createSelector(
  selectDogFeature,
  (state: DogState) => state.dog
);

export const selectDogsLoading = createSelector(
  selectDogFeature,
  (state: DogState) => state.loading
);

export const selectDogError = createSelector(
  selectDogFeature,
  (state: DogState) => state.error
);
