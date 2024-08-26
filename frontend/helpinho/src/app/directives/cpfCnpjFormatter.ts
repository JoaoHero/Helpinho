import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[cpfCnpjFormatter]'
})
export class CpfCnpjFormatterDirective {
  private _previousValue: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const formattedValue = this.formatCpfCnpj(value);
    this.el.nativeElement.value = formattedValue;
    this._previousValue = formattedValue;
  }

  private formatCpfCnpj(value: string): string {
    // Remove caracteres não numéricos
    const cleanedValue = value.replace(/\D+/g, '');
    // Formata CPF ou CNPJ
    if (cleanedValue.length <= 11) {
      return cleanedValue
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{3})(\d{2})$/, '$1-$2');
    } else {
      return cleanedValue
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d{2})$/, '$1-$2');
    }
  }
}
