import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {JsonPipe, NgForOf} from "@angular/common";
import {RadioButtonModule} from "primeng/radiobutton";
import {Selection} from "../../_models/selection";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'radio-button-group',
  standalone: true,
  imports: [
    NgForOf,
    RadioButtonModule,
    ReactiveFormsModule,
    JsonPipe,
    FormsModule
  ],
  templateUrl: './radio-button-group.component.html',
  styleUrl: './radio-button-group.component.css'
})
export class RadioButtonGroupComponent implements OnChanges {

  @Input() selections: Selection[] = [];
  @Input() selected?: Selection;
  @Input() selectionControl: FormControl<Selection | null> = new FormControl<Selection | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selected && this.selections) {
      this.selected = this.selections.find(selection => selection.id === this.selected?.id);
      this.selectionControl.setValue(this.selected!);
    }
  }
}
