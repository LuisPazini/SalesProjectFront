import { Pipe, PipeTransform } from '@angular/core';
import { STATUS_PEDIDO } from '../consts/status-pedido.const';

@Pipe({
  name: 'statusPedido'
})
export class StatusPedidoPipe implements PipeTransform {

  statuses = STATUS_PEDIDO;

  transform(statusId?: number): string {
    if(!statusId) {
      return 'Novo';
    }
    let status = this.statuses.find(status => status.id == statusId);
    return status.nome;
  }

}
