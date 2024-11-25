import {Injectable} from "@angular/core";
import {Condition} from "../_models/condition";
import {FormArray, FormGroup} from "@angular/forms";
import {ConditionTypeEnum} from "../_models/enums/conditionType.enum";
import {Criteria} from "../_models/criteria/criteria";
import {CriteriaTypeEnum} from "../_models/enums/criteriaType.enum";
import {CriteriaAmount} from "../_models/criteria/criteriaAmount";
import {CriteriaTitle} from "../_models/criteria/criteriaTitle";
import {CriteriaDate} from "../_models/criteria/criteriaDate";
import {Filter} from "../_models/filter";
import {SharedDataService} from "./sharedData.service";
import {FilterOptions} from "../_models/filterOptions";

@Injectable({
  providedIn: 'root'
})
export class FilterContentService {

  private _conditions: { amountConditions: Condition[], textConditions: Condition[], dateConditions: Condition[] } = {
    amountConditions: [],
    textConditions: [],
    dateConditions: [],
  }

  constructor(private sharedDataService: SharedDataService) {
    this.sharedDataService.filterOptions$.subscribe((options: FilterOptions) => {
      this.mapConditionsByType(options.criteriaConditions);
    });
  }

  createFilterFromForm(filterForm: FormGroup, criteriaFormArray: FormArray): Filter {
    return  {
      name: filterForm.get('filterName')?.value,
      selection: filterForm.get('selection')?.value,
      criteriaList: this.collectCriteriaList(criteriaFormArray)
    };
  }

  getCriteriaValue(criteria: Criteria): number | string | Date {
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

  get conditions(): { amountConditions: Condition[], textConditions: Condition[], dateConditions: Condition[] } {
    return this._conditions;
  }

  private collectCriteriaList(criteriaFormArray: FormArray): Criteria[] {
    let criteriaList: Criteria[] = []
    for (const criteriaGroup of criteriaFormArray.controls) {
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
    this._conditions.amountConditions = conditions.get(ConditionTypeEnum.AmountCondition)!;
    this._conditions.textConditions = conditions.get(ConditionTypeEnum.TextCondition)!;
    this._conditions.dateConditions = conditions.get(ConditionTypeEnum.DateCondition)!;
  }

}
