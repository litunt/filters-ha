import {Component, Input, OnInit} from '@angular/core';
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
import {tap} from "rxjs";
import {CriteriaType} from "../../_models/criteria/criteriaType";
import {CriteriaTypeEnum} from "../../_models/enums/criteriaType.enum";
import {DatePickerComponent} from "../../_components/date-picker/date-picker.component";

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
    NumberInputComponent,
    DatePickerComponent,
    DatePipe
  ],
  templateUrl: './criteria-row.component.html'
})
export class CriteriaRowComponent implements OnInit {

  @Input() criteriaForm!: FormGroup;
  @Input() editMode: boolean = false;
  @Input() conditions?: { amountConditions: Condition[], textConditions: Condition[], dateConditions: Condition[] };
  currentConditions: Condition[] = [];

  protected readonly criteriaTypes = criteriaTypes;

  ngOnInit(): void {
    const typeControl: FormControl = this.criteriaForm.get('selectedType') as FormControl;
    this.setConditionsOptions(typeControl.value.type);
    typeControl?.valueChanges.pipe(
      tap((value: CriteriaType) => {
        this.resetCriteria(value.type)
      })
    ).subscribe();
  }

  getFormControlByName(name: string): FormControl {
    return this.criteriaForm && this.criteriaForm.get(name) as FormControl;
  }

  private setConditionsOptions(type: CriteriaTypeEnum): void {
    if (type === CriteriaTypeEnum.TITLE) {
      this.currentConditions = this.conditions?.textConditions!;
    } else if (type === CriteriaTypeEnum.AMOUNT) {
      this.currentConditions = this.conditions?.amountConditions!;
    } else if (type === CriteriaTypeEnum.DATE) {
      this.currentConditions = this.conditions?.dateConditions!;
    }
  }

  private resetCriteria(type: CriteriaTypeEnum): void {
    if (type === CriteriaTypeEnum.TITLE) {
      this.currentConditions = this.conditions?.textConditions!;
      this.criteriaForm.get('selectedValue')?.setValue("", { emitEvent: false });
    } else if (type === CriteriaTypeEnum.AMOUNT) {
      this.currentConditions = this.conditions?.amountConditions!;
      this.criteriaForm.get('selectedValue')?.setValue(0, { emitEvent: false });
    } else if (type === CriteriaTypeEnum.DATE) {
      this.currentConditions = this.conditions?.dateConditions!;
      this.criteriaForm.get('selectedValue')?.setValue("", { emitEvent: false });
    }
    this.criteriaForm.get('selectedCondition')?.setValue(this.currentConditions[0], { emitEvent: false });
  }
}
