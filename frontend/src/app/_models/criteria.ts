import {Condition} from "./condition";
import {CriteriaTypeEnum} from "./enums/criteriaType.enum";

export interface Criteria {
  id?: number;
  type: CriteriaTypeEnum;
  condition: Condition;
}
