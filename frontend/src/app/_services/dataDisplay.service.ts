import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataDisplayService {
  private displaySubject = new BehaviorSubject<boolean>(false);
  doDisplay$: Observable<boolean> = this.displaySubject.asObservable();

  updateData(display: boolean) {
    this.displaySubject.next(display);
  }
}
