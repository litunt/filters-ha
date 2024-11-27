import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CriteriaRowComponent} from "../criteria-row/criteria-row.component";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf} from "@angular/common";
import {Filter} from "../../_models/filter";
import {Condition} from "../../_models/condition";
import {RadioButtonGroupComponent} from "../radio-button-group/radio-button-group.component";
import {Selection} from "../../_models/selection";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CriteriaTypeEnum} from "../../_models/enums/criteriaType.enum";
import {Button} from "primeng/button";
import {CriteriaType} from "../../_models/criteria/criteriaType";
import {criteriaTypes} from "../../_util/constants";
import {NotificationService} from "../../_services/notification.service";
import {FilterContentService} from "../../_services/filterContent.service";
import {TranslateModule} from "@ngx-translate/core";

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
    RadioButtonGroupComponent,
    TranslateModule
  ],
  templateUrl: './filter-content.component.html',
  styleUrl: './filter-content.component.css'
})
export class FilterContentComponent implements OnChanges {

  @Input() isEditMode: boolean = false;
  @Input() filter?: Filter;
  @Output() filterValueChange: EventEmitter<Filter> = new EventEmitter<Filter>();

  filterForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private filterContentService: FilterContentService,
              private notificationService: NotificationService) {
    this.filterForm = this.buildFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.criteriaList.clear();
    this.createFilterControls();
    this.createCriteriaFormGroups();
  }

  public onSaveRequested(isSaved: boolean): void {
    if (isSaved) {
      this.filterContentService.markFormAsDirty(this.filterForm);
      if (this.filterForm.valid) {
        let updatedFilter = this.filterContentService.createFilterFromForm(this.filterForm, this.criteriaList);
        if (this.isExistingFilter) {
          updatedFilter.id = this.filter?.id;
        }
        this.filterValueChange.emit(updatedFilter);
        this.filter = undefined;
        this.filterForm = this.buildFormGroup();
        this.createCriteriaFormGroups();
      }
    }
  }

  displayError(controlName: string): boolean {
    return this.filterForm.dirty!
      && this.filterForm.invalid!
      && this.filterForm.get(controlName)?.dirty!
      && this.filterForm.get(controlName)?.invalid!;
  }

  removeCriteriaRow(idx: number): void {
    if (this.criteriaList.length <= 1) {
      this.notificationService.addErrorMessage("criteria.remove.error", "criteria.remove.error.description")
    } else {
      this.criteriaList.removeAt(idx);
    }
  }

  addCriteriaRow(): void {
    this.initDefaultCriteria();
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

  getPossibleConditions(): { amountConditions: Condition[], textConditions: Condition[], dateConditions: Condition[] } {
    return this.filterContentService.conditions;
  }

  private buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      criteriaList: this.formBuilder.array([], Validators.minLength(1)),
      filterName: new FormControl<string>("", Validators.required),
      selection: new FormControl<Selection | null>(null, Validators.required)
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
        selectedValue: new FormControl<number | string>(this.filterContentService.getCriteriaValue(criteria))
      });
      this.criteriaList.push(criteriaGroup);
    }
  }

  private initDefaultCriteria(): void {
    const criteriaGroup = this.formBuilder.group({
      id: new FormControl<number | undefined>(undefined),
      selectedType: new FormControl<CriteriaType>({ title: 'Amount', type: CriteriaTypeEnum.AMOUNT }),
      selectedCondition: new FormControl<Condition>( this.filterContentService.conditions.amountConditions[0]! ),
      selectedValue: new FormControl<number | string>("", Validators.required)
    });
    this.criteriaList.push(criteriaGroup);
  }

  private get isExistingFilter(): boolean {
    return !!this.filter?.id
  }

}
