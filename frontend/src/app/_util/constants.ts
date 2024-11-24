import {CriteriaTypeEnum} from "../_models/enums/criteriaType.enum";
import {CriteriaType} from "../_models/criteriaType";

export const criteriaTypes: CriteriaType[] = [
  { title: 'Amount', type: CriteriaTypeEnum.AMOUNT },
  { title: 'Title', type: CriteriaTypeEnum.TITLE },
  { title: 'Date', type: CriteriaTypeEnum.DATE }
];
