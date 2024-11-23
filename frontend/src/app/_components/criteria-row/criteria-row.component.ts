import {Component, Input} from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CriteriaTypeEnum} from "../../_models/enums/criteriaType.enum";
import {PaginatorModule} from "primeng/paginator";
import {ChipsModule} from "primeng/chips";
import {Condition} from "../../_models/condition";
import {CalendarModule} from "primeng/calendar";
import {DatePipe} from "../../_util/datePipe";
import {NumberInputComponent} from "../number-input/number-input.component";

@Component({
  selector: 'criteria-row',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    DropdownModule,
    FormsModule,
    PaginatorModule,
    ReactiveFormsModule,
    ChipsModule,
    CalendarModule,
    DatePipe,
    NumberInputComponent
  ],
  templateUrl: './criteria-row.component.html',
  styleUrl: './criteria-row.component.css'
})
export class CriteriaRowComponent {

  readonly criteriaTypes: CriteriaType[] = [
    { title: 'Amount', type: CriteriaTypeEnum.AMOUNT },
    { title: 'Title', type: CriteriaTypeEnum.TITLE },
    { title: 'Date', type: CriteriaTypeEnum.DATE }
  ];
  amountConditions: Condition[] = [];
  textConditions: Condition[] = [];
  dateConditions: Condition[] = [];

  @Input() criteriaForm!: FormGroup;
  @Input() editMode: boolean = false;

  getFormControlByName(name: string): FormControl {
    return this.criteriaForm && this.criteriaForm.get(name) as FormControl;
  }

}

interface CriteriaType {
  title: string;
  type: CriteriaTypeEnum;
}
