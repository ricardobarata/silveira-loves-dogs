import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { DogsData } from "./app.models";
import { loadDog } from "./store/actions/app.actions";
import {
  AppState,
  selectDog,
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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadDogLoadingSubscription = this.store
      .pipe(select(selectDogLoading))
      .subscribe((loading: Boolean) => {
        this.loading = loading;
      });
    this.loadDogSubscription = this.store
      .pipe(select(selectDog))
      .subscribe((data: DogsData) => {
        this.data = data;
      });
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
