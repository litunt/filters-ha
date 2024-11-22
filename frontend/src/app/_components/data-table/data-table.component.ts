import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PrimeTemplate} from "primeng/api";
import {TableModule, TableRowSelectEvent} from "primeng/table";
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

  selected?: T;

  @Output() dataRowSelected: EventEmitter<T> = new EventEmitter<T>();

  onRowSelect(event: TableRowSelectEvent): void {
    this.dataRowSelected.emit(event.data);
  }
}
