import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { AuthService } from '../core/services/auth.service';

import { MenuComponent } from '../shared/components/menu/menu.component';
import { STATUS_PEDIDO } from '../shared/consts/status-pedido.const';
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
  statuses = STATUS_PEDIDO;

  hoje: string = moment().format('YYYY-MM-DD');

  dataInicial: string = moment(this.hoje).subtract(30, 'days').format('YYYY-MM-DD');
  dataFinal: string = moment().format('YYYY-MM-DD');
  cliente: Customer;
  status: StatusPedido;

  page: number = 1;
  pageSize: number = 5;

  pageMobile: number = 1;
  pageSizeMobile: number = 5;

  notFoundText: string = 'Não foram encontrados pedidos com os parâmetros informados...';

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private authService: AuthService
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
    this.popularListaPedidos();
    this.popularListaClientes();
    if(this.authService.isUserCustomer()) {
      this.cliente.id = this.authService.getCustomer();
      console.log(this.cliente)
    }
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
