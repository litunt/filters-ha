import {Component, OnInit} from '@angular/core';
import {LoaderService} from "../../_services/loader/loader.service";
import {FiltersService} from "../../_services/filters.service";
import {tap} from "rxjs";
import {Filter} from "../../_models/filter";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {DataTableComponent} from "../../_components/data-table/data-table.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    TableModule,
    Button,
    InputSwitchModule,
    FormsModule,
    DataTableComponent
  ],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {

  readonly properties: string[] = ['name'];
  filters: Filter[] = [];
  selectedFilter!: Filter;

  constructor(private filtersService: FiltersService,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters(): void {
    this.loaderService.setLoading(true);
    this.filtersService.getFilters().pipe(
      tap((filters: Filter[]) => {
        this.loaderService.setLoading(false);
        this.filters = filters;
        console.log(this.filters);
      })
    ).subscribe();
  }
}
