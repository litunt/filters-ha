import {Component, OnInit, ViewChild} from '@angular/core';
import {LoaderService} from "../../_services/loader/loader.service";
import {FiltersService} from "../../_services/filters.service";
import {tap} from "rxjs";
import {Filter} from "../../_models/filter";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {DataTableComponent} from "../../_components/data-table/data-table.component";
import {ModalDialogComponent} from "../../_components/data-display/modal-dialog/modal-dialog.component";
import {CriteriaRowComponent} from "../../_filter-components/criteria-row/criteria-row.component";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {FilterOptionsService} from "../../_services/filterOptions.service";
import {FilterOptions} from "../../_models/filterOptions";
import {InputTextModule} from "primeng/inputtext";
import {FilterContentComponent} from "../../_filter-components/filter-content/filter-content.component";
import {SharedDataService} from "../../_services/sharedData.service";
import {TranslateModule} from "@ngx-translate/core";
import {CardModule} from "primeng/card";
import {DataCardComponent} from "../../_components/data-display/data-card/data-card.component";
import {AppHttpInterceptor} from "../../_services/interceptor/app.http.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NotificationService} from "../../_services/notification.service";
import {DataDisplayService} from "../../_services/dataDisplay.service";

@Component({
  selector: 'app-main-page',
  standalone: true,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
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
    FilterContentComponent,
    TranslateModule,
    NgTemplateOutlet,
    CardModule,
    DataCardComponent
  ],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {

  readonly properties: string[] = ['name'];
  @ViewChild('filterContent') filterContent!: FilterContentComponent;
  filters: Filter[] = [];
  selectedFilter?: Filter;
  isNonModalMode: boolean = false;

  displayFilterModal: boolean = false;
  displayFilterContent: boolean = false;
  isEditMode: boolean = false;

  constructor(private filtersService: FiltersService,
              private sharedDataService: SharedDataService,
              private filterOptionsService: FilterOptionsService,
              private notificationService: NotificationService,
              private dataDisplayService: DataDisplayService,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.loadFilters();
    this.loadFilterOptions();
  }

  onFilterSelected(filter: Filter): void {
    this.selectedFilter = filter;
    this.displayFilterContent = true;
    this.dataDisplayService.updateData(true);
    this.isEditMode = false;
    if (!this.isNonModalMode) {
      this.displayFilterModal = true;
    }
  }

  onAddFilterClicked(): void {
    this.displayFilterContent = true;
    this.dataDisplayService.updateData(true);
    this.isEditMode = true;
    if (!this.isNonModalMode) {
      this.displayFilterModal = true;
    }
  }

  onDisplayClosed(): void {
    this.selectedFilter = undefined;
    this.displayFilterModal = false;
    this.displayFilterContent = false;
    this.isEditMode = false;
  }

  onFilterSaved(filter: Filter): void {
    this.loaderService.setLoading(true);
    this.dataDisplayService.updateData(false);
    this.filtersService.saveFilter(filter).pipe(
      tap((newFilter: Filter) => {
        this.filters = this.filters.filter((f: Filter) => f.id !== newFilter.id);
        this.filters.push(newFilter);
        this.filters.sort((f1, f2) => f1.id! - f2.id!);
        this.loaderService.setLoading(false);
        this.notificationService.addSuccessMessage('notification.saved.success')
      })
    ).subscribe();
  }

  onFilterDeleted(filter: Filter): void {
    this.loaderService.setLoading(true);
    this.dataDisplayService.updateData(false);
    this.filtersService.removeFilter(filter).pipe(
      tap((_) => {
        this.filters = this.filters.filter((f: Filter) => f.id !== filter.id);
        this.loaderService.setLoading(false);
        this.notificationService.addSuccessMessage('notification.deleted.success')
      })
    ).subscribe();
  }

  private loadFilters(): void {
    this.loaderService.setLoading(true);
    this.filtersService.getFilters().pipe(
      tap((filters: Filter[]) => {
        this.loaderService.setLoading(false);
        this.filters = filters;
        this.filters.sort((f1, f2) => f1.id! - f2.id!);
      })
    ).subscribe();
  }

  private loadFilterOptions(): void {
    this.filterOptionsService.getFilterOptions().pipe(
      tap((filterOptions: FilterOptions) => {
        filterOptions.criteriaConditions = new Map(Object.entries(filterOptions.criteriaConditions));
        this.sharedDataService.updateData(filterOptions)
      })
    ).subscribe();
  }
}
