import {Selection} from "./selection";
import {Criteria} from "./criteria";

export interface Filter {
  id?: number;
  name: string;
  selection?: Selection;
  criteriaList: Criteria[]
}
