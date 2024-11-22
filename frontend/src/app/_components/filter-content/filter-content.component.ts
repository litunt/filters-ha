import {Component, Input} from '@angular/core';
import {CriteriaRowComponent} from "../criteria-row/criteria-row.component";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf} from "@angular/common";
import {Filter} from "../../_models/filter";
import {Condition} from "../../_models/condition";
import {RadioButtonGroupComponent} from "../radio-button-group/radio-button-group.component";
import {Selection} from "../../_models/selection";

@Component({
  selector: 'filter-content',
  standalone: true,
  imports: [
    CriteriaRowComponent,
    InputTextModule,
    NgForOf,
    NgIf,
    RadioButtonGroupComponent
  ],
  templateUrl: './filter-content.component.html',
  styleUrl: './filter-content.component.css'
})
export class FilterContentComponent {

  @Input() isEditMode: boolean = false;
  @Input() filter?: Filter;
  @Input() criteriaConditions: Map<string, Condition[]> = new Map();
  @Input() selections: Selection[] = [];


}
