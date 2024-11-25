import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'datePipe',
  standalone: true
})
export class DatePipe implements PipeTransform {
  transform(value: string | Date, format: string = 'dd.mm.yyyy'): string {
    if (!value) {
      return '';
    }
    if (value instanceof Date) {
      return `${this.adjustValue(value.getDate())}.${this.adjustValue(value.getMonth())}.${value.getFullYear()}`
    }
    return value as string;
  }

  private adjustValue(value: number): string {
    value += 1;
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }
}
