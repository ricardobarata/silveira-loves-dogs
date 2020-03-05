import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DogsData } from "../app.models";

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  loadDogs(): Observable<DogsData> {
    return this.http.get<DogsData>("https://dog.ceo/api/breeds/image/random");
  }
}
