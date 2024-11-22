import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PrimeTemplate} from "primeng/api";
import {Table, TableModule, TableRowSelectEvent} from "primeng/table";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [
    PrimeTemplate,
    TableModule,
    NgForOf
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent<T> {

  @Input() properties!: string[];
  @Input() dataList!: T[];

  selected?: T | null;

  @Output() dataRowSelected: EventEmitter<T> = new EventEmitter<T>();

  @ViewChild('dataTable') dataTable?: Table;

  onRowSelect(event: TableRowSelectEvent): void {
    this.dataRowSelected.emit(event.data);
    this.clearSelection();
  }

  private clearSelection(): void {
    this.selected = null;
    this.dataTable!.selection = null;
    this.dataTable!.updateSelectionKeys();
  }
}
