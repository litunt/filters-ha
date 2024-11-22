import {Component, Input, OnInit} from '@angular/core';
import {JsonPipe, NgForOf} from "@angular/common";
import {RadioButtonModule} from "primeng/radiobutton";
import {Selection} from "../../_models/selection";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'radio-button-group',
  standalone: true,
  imports: [
    NgForOf,
    RadioButtonModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './radio-button-group.component.html',
  styleUrl: './radio-button-group.component.css'
})
export class RadioButtonGroupComponent implements OnInit {

  @Input() selections: Selection[] = [];
  @Input() selected?: Selection;

  radioFormGroup: FormGroup = new FormGroup([]);

  ngOnInit(): void {
    this.radioFormGroup = new FormGroup({
      selected: new FormControl(this.selected || null)
    })
  }



}
