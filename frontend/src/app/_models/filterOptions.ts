import {Selection} from "./selection";
import {Condition} from "./condition";

export interface FilterOptions {
  selections: Selection[];
  criteriaConditions: Map<string, Condition[]>;
}
