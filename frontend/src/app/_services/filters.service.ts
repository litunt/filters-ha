import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Filter} from "../_models/filter";

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(private http: HttpClient) {  }

  public getFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]>('/api/filters');
  }
}
