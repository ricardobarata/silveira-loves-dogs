import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { AppService } from "src/app/services/app.service";
import { DogsData } from "../../app.models";
import { loadDog, loadDogFail, loadDogSuccess } from "../actions/app.actions";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private appService: AppService) {}

  loadDogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDog),
      switchMap(() =>
        this.appService.loadDogs().pipe(
          map((data: DogsData) => loadDogSuccess({ data })),
          catchError((error: HttpErrorResponse) => of(loadDogFail({ error })))
        )
      )
    )
  );
}
