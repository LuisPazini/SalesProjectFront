import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer';

@Pipe({
  name: 'cliente'
})
export class ClientePipe implements PipeTransform {

  transform(clienteId: string, listaClientes: Customer[]): string {
    let clienteEncontrado = listaClientes.find(cliente => cliente.id == clienteId); 
    if(clienteEncontrado) {
      return clienteEncontrado.companyName;
    }
    return '-';
  }

}
