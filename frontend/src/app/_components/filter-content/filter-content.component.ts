import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CriteriaRowComponent} from "../criteria-row/criteria-row.component";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf} from "@angular/common";
import {Filter} from "../../_models/filter";
import {Condition} from "../../_models/condition";
import {RadioButtonGroupComponent} from "../radio-button-group/radio-button-group.component";
import {Selection} from "../../_models/selection";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ConditionTypeEnum} from "../../_models/enums/conditionType.enum";
import {CriteriaTypeEnum} from "../../_models/enums/criteriaType.enum";
import {CriteriaAmount} from "../../_models/criteriaAmount";
import {CriteriaTitle} from "../../_models/criteriaTitle";
import {CriteriaDate} from "../../_models/criteriaDate";
import {Criteria} from "../../_models/criteria";

@Component({
  selector: 'filter-content',
  standalone: true,
  imports: [
    CriteriaRowComponent,
    InputTextModule,
    NgForOf,
    NgIf,
    RadioButtonGroupComponent,
    ReactiveFormsModule
  ],
  templateUrl: './filter-content.component.html',
  styleUrl: './filter-content.component.css'
})
export class FilterContentComponent implements OnInit, OnChanges {

  readonly criteriaTypes: CriteriaType[] = [
    { title: 'Amount', type: CriteriaTypeEnum.AMOUNT },
    { title: 'Title', type: CriteriaTypeEnum.TITLE },
    { title: 'Date', type: CriteriaTypeEnum.DATE }
  ];

  @Input() isEditMode: boolean = false;
  @Input() filter?: Filter;
  @Input() criteriaConditions?: Map<string, Condition[]>;
  @Input() selections: Selection[] = [];

  amountConditions: Condition[] = [];
  textConditions: Condition[] = [];
  dateConditions: Condition[] = [];

  filterForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.mapConditionsByType();
    this.filterForm = this.formBuilder.group({
      criteriaList: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.createCriteriaFormGroups();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.criteriaList.clear();
      this.createCriteriaFormGroups();
    }
  }

  get criteriaList(): FormArray {
    return this.filterForm.get('criteriaList') as FormArray;
  }

  getCriteriaForm(idx: number): FormGroup {
    return this.criteriaList.at(idx) as FormGroup;
  }

  private createCriteriaFormGroups(): void {
    if (this.filter) {
      this.setExistingCriteriaValues();
    } else {
      this.initDefaultCriteria();
    }
  }

  private setExistingCriteriaValues(): void {
    for (const criteria of this.filter?.criteriaList!) {
      const criteriaGroup = this.formBuilder.group({
        selectedType: new FormControl<CriteriaType>(this.criteriaTypes.find(c => c.type === criteria.type)!),
        selectedCondition: new FormControl<Condition>(criteria.condition),
        selectedValue: new FormControl<number | string | Date>(this.getCriteriaValue(criteria))
      });
      this.criteriaList.push(criteriaGroup);
    }
  }

  private initDefaultCriteria(): void {
    const criteriaGroup = this.formBuilder.group({
      selectedType: new FormControl<CriteriaType>({ title: 'Amount', type: CriteriaTypeEnum.AMOUNT }),
      selectedCondition: new FormControl<Condition>( this.criteriaConditions?.get(ConditionTypeEnum.AmountCondition)![0]! ),
      selectedValue: new FormControl<number | string | Date>(0)
    });
    this.criteriaList.push(criteriaGroup);
  }

  private mapConditionsByType(): void {
    this.amountConditions = this.criteriaConditions?.get(ConditionTypeEnum.AmountCondition)!;
    this.textConditions = this.criteriaConditions?.get(ConditionTypeEnum.TextCondition)!;
    this.dateConditions = this.criteriaConditions?.get(ConditionTypeEnum.DateCondition)!;
  }

  private getCriteriaValue(criteria: Criteria): number | string | Date {
    switch (criteria.type) {
      case CriteriaTypeEnum.AMOUNT:
        return (criteria as CriteriaAmount).numberValue;
      case CriteriaTypeEnum.TITLE:
        return (criteria as CriteriaTitle).textValue;
      case CriteriaTypeEnum.DATE:
        return new Date((criteria as CriteriaDate).dateValue);
    }
    return 0;
  }

}

interface CriteriaType {
  title: string;
  type: CriteriaTypeEnum;
}
