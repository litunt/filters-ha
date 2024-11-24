import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CriteriaRowComponent} from "../criteria-row/criteria-row.component";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf} from "@angular/common";
import {Filter} from "../../_models/filter";
import {Condition} from "../../_models/condition";
import {RadioButtonGroupComponent} from "../radio-button-group/radio-button-group.component";
import {Selection} from "../../_models/selection";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConditionTypeEnum} from "../../_models/enums/conditionType.enum";
import {CriteriaTypeEnum} from "../../_models/enums/criteriaType.enum";
import {CriteriaAmount} from "../../_models/criteria/criteriaAmount";
import {CriteriaTitle} from "../../_models/criteria/criteriaTitle";
import {CriteriaDate} from "../../_models/criteria/criteriaDate";
import {Criteria} from "../../_models/criteria/criteria";
import {Button} from "primeng/button";
import {CriteriaType} from "../../_models/criteria/criteriaType";
import {criteriaTypes} from "../../_util/constants";
import {SharedDataService} from "../../_services/sharedData.service";
import {FilterOptions} from "../../_models/filterOptions";
import {NotificationService} from "../../_services/notification.service";

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
  @Input() filter?: Filter;

  @Output() filterValueChange: EventEmitter<Filter> = new EventEmitter<Filter>();

  private amountConditions: Condition[] = [];
  private textConditions: Condition[] = [];
  private dateConditions: Condition[] = [];

  filterForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private sharedDataService: SharedDataService) {
    this.sharedDataService.filterOptions$.subscribe((options: FilterOptions) => {
      this.mapConditionsByType(options.criteriaConditions);
      this.filterForm = this.buildFormGroup();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.criteriaList.clear();
    this.createFilterControls();
    this.createCriteriaFormGroups();
  }

  public onSaveRequested(isSaved: boolean): void {
    if (isSaved) {
      let updatedFilter = this.createFilterFromForm();
      if (this.isExistingFilter) {
        updatedFilter.id = this.filter?.id;
      }
      this.filterValueChange.emit(updatedFilter);
    }
    this.filter = undefined;
    this.filterForm = this.buildFormGroup();
    this.createCriteriaFormGroups();
  }

  removeCriteriaRow(idx: number): void {
    if (this.criteriaList.length <= 1) {
      this.notificationService.addErrorMessage("criteria.remove.error", "criteria.remove.error.description")
    } else {
      this.criteriaList.removeAt(idx);
    }
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
        id: new FormControl<number | undefined>(criteria.id),
        selectedType: new FormControl<CriteriaType>(criteriaTypes.find(c => c.type === criteria.type)!),
        selectedCondition: new FormControl<Condition>(criteria.condition),
        selectedValue: new FormControl<number | string | Date>(this.getCriteriaValue(criteria))
      });
      this.criteriaList.push(criteriaGroup);
    }
  }

  private initDefaultCriteria(): void {
    const criteriaGroup = this.formBuilder.group({
      id: new FormControl<number | undefined>(undefined),
      selectedType: new FormControl<CriteriaType>({ title: 'Amount', type: CriteriaTypeEnum.AMOUNT }),
      selectedCondition: new FormControl<Condition>( this.amountConditions[0]! ),
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
      const id: number = criteriaGroup.get('id')?.value;
      let criteria!: Criteria;
      if (type === CriteriaTypeEnum.AMOUNT) {
        criteria = {
          id,
          type,
          condition,
          numberValue: criteriaValue as number
        } as CriteriaAmount
      } else if (type === CriteriaTypeEnum.TITLE) {
        criteria = {
          id,
          type,
          condition,
          textValue: criteriaValue as string
        } as CriteriaTitle
      } else if (type === CriteriaTypeEnum.DATE) {
        criteria = {
          id,
          type,
          condition,
          dateValue: criteriaValue as Date
        } as CriteriaDate
      }
      criteriaList.push(criteria);
    }
    return criteriaList;
  }

  private mapConditionsByType(conditions: Map<string, Condition[]>): void {
    this.amountConditions = conditions.get(ConditionTypeEnum.AmountCondition)!;
    this.textConditions = conditions.get(ConditionTypeEnum.TextCondition)!;
    this.dateConditions = conditions.get(ConditionTypeEnum.DateCondition)!;
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
