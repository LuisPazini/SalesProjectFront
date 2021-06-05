import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moedaBr'
})
export class MoedaBrPipe implements PipeTransform {

  transform(valor: number): string {
    return valor.toString().replace('.',',');
  }

}
