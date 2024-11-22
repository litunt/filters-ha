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
      return `${value.getDate()}.${this.adjustMonth(value)}.${value.getFullYear()}`
    }
    return value as string;
  }

  private adjustMonth(value: Date): string {
    let month = value.getMonth() + 1;
    if (month < 10) {
      return `0${month}`;
    }
    return `${month}`;
  }
}
