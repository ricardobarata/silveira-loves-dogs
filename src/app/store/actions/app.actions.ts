import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { DogsData } from "src/app/app.models";

export const loadDog = createAction("[App] Load Dog");

export const loadDogSuccess = createAction(
  "[App] Load Dog Success",
  props<{ data: DogsData }>()
);

export const loadDogFail = createAction(
  "[App] Load Dog Fail",
  props<{ error: HttpErrorResponse }>()
);
