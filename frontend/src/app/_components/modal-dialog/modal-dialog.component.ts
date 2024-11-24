import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {CommonModule, NgIf, NgTemplateOutlet} from "@angular/common";
import {Button} from "primeng/button";

@Component({
  selector: 'modal-dialog',
  standalone: true,
  imports: [
    DialogModule,
    NgTemplateOutlet,
    CommonModule,
    Button,
    NgIf
  ],
  templateUrl: './modal-dialog.component.html'
})
export class ModalDialogComponent {

  isEditMode: boolean = false;

  @Input() body: TemplateRef<Element> | null = null;
  @Input() filterName?: string;
  @Output() onFilterSaved: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() set editMode(value: boolean) {
    this.isEditMode = value;
  }
  @Output() displayModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() displayModal: boolean = false;

  closeModal(toSave: boolean): void {
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
    this.displayModal = false;
    this.filterName = "";
    this.displayModalChange.emit(false);
    this.onEditMode(false);
  }
}
