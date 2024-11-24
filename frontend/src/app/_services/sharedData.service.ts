import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {FilterOptions} from "../_models/filterOptions";

@Injectable({ providedIn: 'root' })
export class SharedDataService {

  private filterOptionsSubject = new BehaviorSubject<FilterOptions>({
    selections: [],
    criteriaConditions: new Map
  });
  filterOptions$: Observable<FilterOptions> = this.filterOptionsSubject.asObservable();

  updateData(options: FilterOptions) {
    this.filterOptionsSubject.next(options);
  }
}
