import {Component, Input, OnInit} from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {Criteria} from "../../_models/criteria";
import {DropdownModule} from "primeng/dropdown";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CriteriaTypeEnum} from "../../_models/enums/criteriaType.enum";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'criteria-row',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    DropdownModule,
    FormsModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './criteria-row.component.html',
  styleUrl: './criteria-row.component.css'
})
export class CriteriaRowComponent implements OnInit {

  readonly criteriaTypes: CriteriaType[] = [
    { title: 'Amount', type: CriteriaTypeEnum.AMOUNT },
    { title: 'Title', type: CriteriaTypeEnum.TITLE },
    { title: 'Date', type: CriteriaTypeEnum.DATE }
  ];

  criteriaForm: FormGroup = new FormGroup([]);

  selectedType: CriteriaType = { title: 'Amount', type: CriteriaTypeEnum.AMOUNT };

  @Input() criteria?: Criteria;

  ngOnInit(): void {
    if (this.criteria) {
      this.criteriaForm = new FormGroup({
        selectedType: new FormControl<CriteriaType>(this.criteriaTypes.find(c => c.type === this.criteria!.type)!)
      });
    } else {
      this.criteriaForm = new FormGroup({
        selectedType: new FormControl<CriteriaType>({ title: 'Amount', type: CriteriaTypeEnum.AMOUNT })
      });
    }
  }

}

interface CriteriaType {
  title: string;
  type: CriteriaTypeEnum;
}
