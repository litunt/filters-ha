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
import {ModalDialogComponent} from "../../_components/modal-dialog/modal-dialog.component";
import {CriteriaRowComponent} from "../../_components/criteria-row/criteria-row.component";
import {NgForOf, NgIf} from "@angular/common";
import {FilterOptionsService} from "../../_services/filterOptions.service";
import {FilterOptions} from "../../_models/filterOptions";
import {InputTextModule} from "primeng/inputtext";
import {FilterContentComponent} from "../../_components/filter-content/filter-content.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    TableModule,
    Button,
    InputSwitchModule,
    FormsModule,
    DataTableComponent,
    ModalDialogComponent,
    CriteriaRowComponent,
    NgForOf,
    NgIf,
    InputTextModule,
    FilterContentComponent
  ],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {

  readonly properties: string[] = ['name'];
  filters: Filter[] = [];
  selectedFilter?: Filter;
  filterOptions?: FilterOptions;

  displayFilterModal: boolean = false;
  isEditMode: boolean = false;

  constructor(private filtersService: FiltersService,
              private filterOptionsService: FilterOptionsService,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.loadFilters();
    this.loadFilterOptions();
  }

  onFilterSelected(filter: Filter): void {
    this.selectedFilter = filter;
    this.displayFilterModal = true;
    this.isEditMode = false;
  }

  onAddFilterClicked(): void {
    this.selectedFilter = undefined;
    this.displayFilterModal = true;
    this.isEditMode = true;
  }

  private loadFilters(): void {
    this.loaderService.setLoading(true);
    this.filtersService.getFilters().pipe(
      tap((filters: Filter[]) => {
        this.loaderService.setLoading(false);
        this.filters = filters;
      })
    ).subscribe();
  }

  private loadFilterOptions(): void {
    this.filterOptionsService.getFilterOptions().pipe(
      tap((filterOptions: FilterOptions) => {
        filterOptions.criteriaConditions = new Map(Object.entries(filterOptions.criteriaConditions));
        this.filterOptions = filterOptions;
      })
    ).subscribe();
  }
}
