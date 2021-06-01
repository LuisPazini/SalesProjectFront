import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { MenuComponent } from '../shared/components/menu/menu.component';
import { StatusPedido } from '../shared/enums/status-pedido.enum';
import { Customer } from '../shared/models/customer';
import { Order } from '../shared/models/order';
import { ClienteService } from '../shared/services/cliente.service';
import { PedidoService } from '../shared/services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.sass']
})
export class PedidosComponent implements OnInit {

  pedidos: Order[] = [] as Order[];
  clientes: Customer[] = [] as Customer[];
  statuses = [
    { id: 1, nome: 'ABERTO' },
    { id: 2, nome: 'APROVADO' },
    { id: 3, nome: 'FATURADO' },
    { id: 4, nome: 'CANCELADO' }
  ];

  hoje: string = moment().format('YYYY-MM-DD');

  dataInicial: string = moment(this.hoje).subtract(30, 'days').format('YYYY-MM-DD');
  dataFinal: string = moment().format('YYYY-MM-DD');
  cliente: Customer;
  status: StatusPedido;

  page: number = 1;
  pageSize: number = 5;

  notFoundText: string = 'Não foram encontrados pedidos com os parâmetros informados...';

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
    this.popularListaPedidos();
    this.popularListaClientes();
  }

  popularListaPedidos(): void {
    this.getPedidos().then((pedidos) => {
      if(pedidos) {
        this.pedidos = pedidos;
      } else {
        this.limparListaPedidos();
      }
    }).catch((error) => {
      if(error.status == 404) {
        this.limparListaPedidos();
      }
    })
  }

  private async getPedidos(): Promise<Order[]> {
    return await this.pedidoService.getAll({ 
      dataInicial: this.dataInicial,
      dataFinal: this.dataFinal,
      cliente: this.cliente,
      status: this.status
    });
  }

  private limparListaPedidos(): void {
    this.pedidos = [] as Order[];
  }

  private popularListaClientes(): void {
    this.clienteService.getAll().then((clientes) => {
      this.clientes = clientes;
    });
  }

}
