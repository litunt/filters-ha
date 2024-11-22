import {ConditionTypeEnum} from "./enums/conditionType.enum";

export interface Condition {
  id: number;
  title: string;
  conditionType: ConditionTypeEnum
}
