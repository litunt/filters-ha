import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'number-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.css'
})
export class NumberInputComponent {

  @Input() control!: FormControl;

}
