import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {Filter} from "../../_models/filter";
import {Button} from "primeng/button";

@Component({
  selector: 'modal-dialog',
  standalone: true,
  imports: [
    DialogModule,
    NgTemplateOutlet,
    Button,
    NgIf
  ],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css'
})
export class ModalDialogComponent {

  display: boolean = false;

  @Input() body: TemplateRef<Element> | null = null;
  @Input() filter!: Filter;
  @Output() displayModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() set displayModal(value: boolean) {
    this.display = value;
  }

  closeModal(): void {
    this.display = false;
    this.displayModalChange.emit(false);
  }
}
