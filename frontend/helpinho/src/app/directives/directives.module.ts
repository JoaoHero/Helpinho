import { NgModule } from '@angular/core';
import { CpfCnpjFormatterDirective } from './cpfCnpjFormatter';
import { DateFormatterDirective } from './dateFormatter';

@NgModule({
  declarations: [CpfCnpjFormatterDirective, DateFormatterDirective],
  exports: [CpfCnpjFormatterDirective, DateFormatterDirective]
})
export class DirectivesModule {}