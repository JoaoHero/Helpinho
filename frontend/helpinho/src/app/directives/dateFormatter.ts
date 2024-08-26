import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[dateFormatter]'
})
export class DateFormatterDirective {
  private _previousValue: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const formattedValue = this.formatDate(value);
    this.el.nativeElement.value = formattedValue;
    this._previousValue = formattedValue;
  }

  private formatDate(value: string): string {
    const cleanedValue = value.replace(/\D+/g, '');
    return cleanedValue
      .replace(/^(\d{2})(\d)/, '$1/$2')
      .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
      .substring(0, 10); // Limita o comprimento máximo da data
  }
}
