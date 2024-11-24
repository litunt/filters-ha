import {CriteriaTypeEnum} from "../_models/enums/criteriaType.enum";
import {CriteriaType} from "../_models/criteria/criteriaType";

export const criteriaTypes: CriteriaType[] = [
  { title: 'Amount', type: CriteriaTypeEnum.AMOUNT },
  { title: 'Title', type: CriteriaTypeEnum.TITLE },
  { title: 'Date', type: CriteriaTypeEnum.DATE }
];
