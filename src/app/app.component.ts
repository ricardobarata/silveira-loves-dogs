import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { DogsData } from "./app.models";
import { loadDog, loadDogSuccess } from "./store/actions/app.actions";
import {
  AppState,
  selectDogError,
  selectDogsLoading as selectDogLoading
} from "./store/selectors/app.selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  loading: Boolean;
  data: DogsData;
  error: HttpErrorResponse;

  private loadDogLoadingSubscription: Subscription;
  private loadDogSubscription: Subscription;
  private loadDogErrorSubscription: Subscription;

  constructor(private store: Store<AppState>, private actions$: Actions) {}

  ngOnInit(): void {
    this.loadDogLoadingSubscription = this.store
      .pipe(select(selectDogLoading))
      .subscribe((loading: Boolean) => {
        this.loading = loading;
      });

    // Method 1: Subscribe to the store
    // -----------------------------------
    // this.loadDogSubscription = this.store
    //   .pipe(select(selectDog))
    //   .subscribe((data: DogsData) => {
    //     this.data = data;
    //   });
    // END Method 1

    // Method 2: Subscribe to the success action
    // -----------------------------------
    this.loadDogSubscription = this.actions$
      .pipe(
        ofType(loadDogSuccess),
        map(action => action.data)
      )
      .subscribe((data: DogsData) => {
        this.data = data;
      });
    // END Method 2

    this.loadDogErrorSubscription = this.store
      .pipe(select(selectDogError))
      .subscribe((error: HttpErrorResponse) => {
        this.error = error;
      });
  }

  ngOnDestroy(): void {
    this.loadDogLoadingSubscription.unsubscribe();
    this.loadDogSubscription.unsubscribe();
    this.loadDogErrorSubscription.unsubscribe();
  }

  onLoadDog(): void {
    this.store.dispatch(loadDog());
  }
}
