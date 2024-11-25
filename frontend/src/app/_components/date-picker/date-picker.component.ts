import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {tap} from "rxjs";

@Component({
  selector: 'date-picker',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent implements OnInit {

  @Input() control!: FormControl;
  dateValue: string = this.todayAsNative();

  ngOnInit(): void {
    this.control.setValue(this.transformToStandard(this.dateValue));
  }

  updateValue(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    this.dateValue = inputElement.value
    this.control.setValue(this.transformToStandard(inputElement.value))
  }

  private transformToStandard(value: string): string {
    const date: Date = new Date(value);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  private todayAsNative(): string {
    const today: Date = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`;
  }

}
