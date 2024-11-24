import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
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
import {Button} from "primeng/button";
import {CriteriaType} from "../../_models/criteriaType";
import {criteriaTypes} from "../../_util/constants";

@Component({
  selector: 'filter-content',
  standalone: true,
  imports: [
    CriteriaRowComponent,
    InputTextModule,
    NgForOf,
    NgIf,
    RadioButtonGroupComponent,
    ReactiveFormsModule,
    Button,
    RadioButtonGroupComponent
  ],
  templateUrl: './filter-content.component.html',
  styleUrl: './filter-content.component.css'
})
export class FilterContentComponent implements OnChanges {

  @Input() isEditMode: boolean = false;
  @Input() criteriaConditions?: Map<string, Condition[]>;
  @Input() selections: Selection[] = [];
  @Input() filter?: Filter;

  @Output() filterValueChange: EventEmitter<Filter> = new EventEmitter<Filter>();

  amountConditions: Condition[] = [];
  textConditions: Condition[] = [];
  dateConditions: Condition[] = [];

  filterForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.mapConditionsByType();
    this.filterForm = this.buildFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.criteriaList.clear();
    this.createFilterControls();
    this.createCriteriaFormGroups();
  }

  public onSaveRequested(isSaved: boolean): void {
    if (isSaved) {
      console.log(this.filterForm)
      let updatedFilter = this.createFilterFromForm();
      if (this.isExistingFilter) {
        updatedFilter.id = this.filter?.id;
      }
      this.filterValueChange.emit(updatedFilter);
    }
    this.filter = undefined;
    this.createCriteriaFormGroups();
    this.filterForm = this.buildFormGroup();
  }

  get criteriaList(): FormArray {
    return this.filterForm.get('criteriaList') as FormArray;
  }

  getCriteriaForm(idx: number): FormGroup {
    return this.criteriaList.at(idx) as FormGroup;
  }

  get getSelectionControl(): FormControl {
    return this.filterForm.get('selection') as FormControl;
  }

  getConditionsByCriteriaType(criteriaFormIdx: number): Condition[] {
    const criteriaForm: FormGroup = this.getCriteriaForm(criteriaFormIdx);
    const type: CriteriaTypeEnum = criteriaForm.get('selectedType')?.value!.type;
    switch (type) {
      case CriteriaTypeEnum.AMOUNT:
        return this.amountConditions;
      case CriteriaTypeEnum.TITLE:
        return this.textConditions;
      case CriteriaTypeEnum.DATE:
        return this.dateConditions;
    }
  }

  private buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      criteriaList: this.formBuilder.array([]),
      filterName: new FormControl<string>(""),
      selection: new FormControl<Selection | null>(null)
    });
  }

  private createCriteriaFormGroups(): void {
    if (this.isExistingFilter) {
      this.setExistingCriteriaValues();
    } else {
      this.initDefaultCriteria();
    }
  }

  private createFilterControls(): void {
    if (this.isExistingFilter) {
      this.filterForm.get('filterName')?.setValue(this.filter?.name);
      this.filterForm.get('selection')?.setValue(this.filter?.selection);
    } else {
      this.filterForm.addControl('filterName', new FormControl<string>(""));
      this.filterForm.addControl('selection', new FormControl<Selection | null>(null));
    }
  }

  private setExistingCriteriaValues(): void {
    for (const criteria of this.filter?.criteriaList!) {
      const criteriaGroup = this.formBuilder.group({
        selectedType: new FormControl<CriteriaType>(criteriaTypes.find(c => c.type === criteria.type)!),
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

  private createFilterFromForm(): Filter {
    return  {
      name: this.filterForm.get('filterName')?.value,
      selection: this.filterForm.get('selection')?.value,
      criteriaList: this.collectCriteriaList()
    };
  }

  private collectCriteriaList(): Criteria[] {
    let criteriaList: Criteria[] = []
    for (const criteriaGroup of this.criteriaList.controls) {
      const type: CriteriaTypeEnum = criteriaGroup.get('selectedType')?.value!.type;
      const condition: Condition = criteriaGroup.get('selectedCondition')?.value;
      const criteriaValue: number | string | Date = criteriaGroup.get('selectedValue')?.value;
      let criteria!: Criteria;
      if (type === CriteriaTypeEnum.AMOUNT) {
        criteria = {
          type,
          condition,
          numberValue: criteriaValue as number
        } as CriteriaAmount
      } else if (type === CriteriaTypeEnum.TITLE) {
        criteria = {
          type,
          condition,
          textValue: criteriaValue as string
        } as CriteriaTitle
      } else if (type === CriteriaTypeEnum.DATE) {
        criteria = {
          type,
          condition,
          dateValue: criteriaValue as Date
        } as CriteriaDate
      }
      criteriaList.push(criteria);
    }
    return criteriaList;
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

  private get isExistingFilter(): boolean {
    return !!this.filter?.id
  }

}
