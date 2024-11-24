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

  public saveFilter(filter: Filter): Observable<Filter> {
    if (filter.id) {
      return this.updateFilter(filter);
    }
    return this.createFilter(filter);
  }

  private updateFilter(filter: Filter): Observable<Filter> {
    return this.http.put<Filter>(`/api/filters/${filter.id}`, filter);
  }

  private createFilter(filter: Filter): Observable<Filter> {
    return this.http.post<Filter>(`/api/filters`, filter);
  }
}
