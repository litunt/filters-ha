import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {Criteria} from "../../_models/criteria";
import {DropdownModule} from "primeng/dropdown";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CriteriaTypeEnum} from "../../_models/enums/criteriaType.enum";
import {PaginatorModule} from "primeng/paginator";
import {ChipsModule} from "primeng/chips";
import {Condition} from "../../_models/condition";
import {ConditionTypeEnum} from "../../_models/enums/conditionType.enum";
import {CriteriaAmount} from "../../_models/criteriaAmount";
import {CriteriaTitle} from "../../_models/criteriaTitle";
import {CriteriaDate} from "../../_models/criteriaDate";
import {CalendarModule} from "primeng/calendar";
import {AppModule} from "../../app.module";
import {DatePipe} from "../../_util/datePipe";

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
    DatePipe
  ],
  templateUrl: './criteria-row.component.html',
  styleUrl: './criteria-row.component.css'
})
export class CriteriaRowComponent implements OnInit {

  readonly criteriaTypes: CriteriaType[] = [
    { title: 'Amount', type: CriteriaTypeEnum.AMOUNT },
    { title: 'Title', type: CriteriaTypeEnum.TITLE },
    { title: 'Date', type: CriteriaTypeEnum.DATE }
  ];
  amountConditions: Condition[] = [];
  textConditions: Condition[] = [];
  dateConditions: Condition[] = [];

  criteriaForm: FormGroup = new FormGroup([]);

  @Input() criteria?: Criteria;
  @Input() editMode: boolean = false;
  @Input() criteriaConditions?: Map<string, Condition[]>;

  ngOnInit(): void {
    this.mapConditionsByType();
    if (this.criteria) {
      this.criteriaForm = new FormGroup({
        selectedType: new FormControl<CriteriaType>(this.criteriaTypes.find(c => c.type === this.criteria!.type)!),
        selectedCondition: new FormControl<Condition>(this.criteria.condition),
        selectedValue: new FormControl<number | string | Date>(this.getCriteriaValue())
      });
    } else {
      this.criteriaForm = new FormGroup({
        selectedType: new FormControl<CriteriaType>({ title: 'Amount', type: CriteriaTypeEnum.AMOUNT }),
        selectedCondition: new FormControl<Condition>( this.criteriaConditions?.get(ConditionTypeEnum.AmountCondition)![0]! ),
        selectedValue: new FormControl<number | string | Date>(0)
      });
    }
  }

  private mapConditionsByType(): void {
    this.amountConditions = this.criteriaConditions?.get(ConditionTypeEnum.AmountCondition)!;
    this.textConditions = this.criteriaConditions?.get(ConditionTypeEnum.TextCondition)!;
    this.dateConditions = this.criteriaConditions?.get(ConditionTypeEnum.DateCondition)!;
  }

  private getCriteriaValue(): number | string | Date {
    switch (this.criteria?.type) {
      case CriteriaTypeEnum.AMOUNT:
        return (this.criteria as CriteriaAmount).numberValue;
      case CriteriaTypeEnum.TITLE:
        return (this.criteria as CriteriaTitle).textValue;
      case CriteriaTypeEnum.DATE:
        return new Date((this.criteria as CriteriaDate).dateValue);
    }
    return 0;
  }

}

interface CriteriaType {
  title: string;
  type: CriteriaTypeEnum;
}
