import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Condition} from "../_models/condition";

@Injectable({
  providedIn: 'root'
})
export class FilterOptionsService {

  constructor(private http: HttpClient) {  }

  public getConditions(): Observable<Condition[]> {
    return this.http.get<Condition[]>('/api/filter-options/conditions');
  }
}
