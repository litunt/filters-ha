import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {NgTemplateOutlet} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TranslateModule} from "@ngx-translate/core";
import {DataDisplayService} from "../../_services/dataDisplay.service";

@Component({
  standalone: true,
  template: '',
  imports: [
    Button,
    CardModule,
    NgTemplateOutlet,
    PrimeTemplate,
    TranslateModule
  ]
})
export class DataDisplayComponent {

  isEditMode: boolean = false;

  @Input() body: TemplateRef<Element> | null = null;
  @Input() title?: string;
  @Output() onFilterSaved: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onFilterDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() set editMode(value: boolean) {
    this.isEditMode = value;
  }
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() display: boolean = false;

  constructor(private dataDisplayService: DataDisplayService) {
    this.dataDisplayService.doDisplay$.subscribe((doDisplay: boolean) => {
      if (!doDisplay) {
        this.close();
      }
    });
  }

  closeDisplay(toSave: boolean): void {
    if (toSave) {
      this.onFilterSaved.emit(true);
    } else {
      this.onFilterSaved.emit(false);
      this.close();
    }
  }

  onEditMode(isEdit: boolean): void {
    this.isEditMode = isEdit;
    this.editModeChange.emit(isEdit);
  }

  delete(): void {
    this.onFilterDeleted.emit(true);
    this.close();
  }

  private close(): void {
    this.display = false;
    this.title = "";
    this.displayChange.emit(false);
    this.onEditMode(false);
  }

}
