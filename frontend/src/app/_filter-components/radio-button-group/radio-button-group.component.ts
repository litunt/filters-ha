import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {JsonPipe, NgForOf} from "@angular/common";
import {RadioButtonModule} from "primeng/radiobutton";
import {Selection} from "../../_models/selection";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedDataService} from "../../_services/sharedData.service";
import {FilterOptions} from "../../_models/filterOptions";

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
  templateUrl: './radio-button-group.component.html'
})
export class RadioButtonGroupComponent implements OnChanges {

  @Input() selections: Selection[] = [];
  @Input() selected?: Selection;
  @Input() selectionControl: FormControl<Selection | null> = new FormControl<Selection | null>(null);

  constructor(private sharedDataService: SharedDataService) {
    this.sharedDataService.filterOptions$.subscribe((options: FilterOptions) => {
      this.selections = options.selections;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selected && this.selections) {
      this.selected = this.selections.find(selection => selection.id === this.selected?.id);
      this.selectionControl.setValue(this.selected!);
    }
  }
}
