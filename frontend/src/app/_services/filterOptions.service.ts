import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilterOptions} from "../_models/filterOptions";

@Injectable({
  providedIn: 'root'
})
export class FilterOptionsService {

  constructor(private http: HttpClient) {  }

  public getFilterOptions(): Observable<FilterOptions> {
    return this.http.get<FilterOptions>('/api/filter-options');
  }
}
