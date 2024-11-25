import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {NgTemplateOutlet} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TranslateModule} from "@ngx-translate/core";

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
  @Output() editModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() set editMode(value: boolean) {
    this.isEditMode = value;
  }
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() display: boolean = false;

  closeDisplay(toSave: boolean): void {
    if (toSave) {
      this.onFilterSaved.emit(true);
    } else {
      this.onFilterSaved.emit(false);
    }
    this.close();
  }

  onEditMode(isEdit: boolean): void {
    this.isEditMode = isEdit;
    this.editModeChange.emit(isEdit);
  }

  private close(): void {
    this.display = false;
    this.title = "";
    this.displayChange.emit(false);
    this.onEditMode(false);
  }

}
