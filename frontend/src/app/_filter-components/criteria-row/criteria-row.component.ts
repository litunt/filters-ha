import {Component, Input} from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {ChipsModule} from "primeng/chips";
import {Condition} from "../../_models/condition";
import {CalendarModule} from "primeng/calendar";
import {DatePipe} from "../../_util/datePipe";
import {NumberInputComponent} from "../../_components/number-input/number-input.component";
import {criteriaTypes} from "../../_util/constants";

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
  templateUrl: './criteria-row.component.html'
})
export class CriteriaRowComponent {

  @Input() criteriaForm!: FormGroup;
  @Input() editMode: boolean = false;
  @Input() conditions?: Condition[];

  getFormControlByName(name: string): FormControl {
    return this.criteriaForm && this.criteriaForm.get(name) as FormControl;
  }

  protected readonly criteriaTypes = criteriaTypes;
}
