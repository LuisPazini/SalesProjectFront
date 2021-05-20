import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { Order } from '../shared/models/order';
import { PedidoService } from '../shared/services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.sass']
})
export class PedidosComponent implements OnInit {

  pedidos: Order[] = [] as Order[];
  pedidosFiltrados: Order[] = [] as Order[];

  hoje: string = moment().format('L');

  dataInicial: string = moment(this.hoje).subtract(30, 'days').format('L');
  dataFinal: string = moment().format('L');

  page: number = 1;
  pageSize: number = 7;

  notFoundText: string = 'Digite ao menos 3 caracteres do nome de produto';

  constructor(
    private pedidoService: PedidoService,
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
  }

  filtrarPedidos(termo: string): void {
    if(termo.length < 3) {
      this.limparListaPedidos();
      this.notFoundText = "Digite ao menos 3 caracteres do nome de pedido";
    } else {
      if(termo.length == 3) {
        this.popularListaPedidos().then(() => 
          this.popularListaPedidosFiltrados(termo)
        );
      }
      this.popularListaPedidosFiltrados(termo);
      this.notFoundText = `Não foi encontrado nenhum pedido com nome "${termo}"`;
    }
  }

  private async popularListaPedidos(): Promise<void> {
    this.pedidos = await this.pedidoService.getAll();
  }

  private popularListaPedidosFiltrados(termo: string): void {
    this.pedidosFiltrados = this.pedidos.filter(pedido => 
      pedido.postingDate.toLowerCase().includes(termo.toLowerCase())
    )
  }

  private limparListaPedidos(): void {
    this.pedidos = [] as Order[];
    this.pedidosFiltrados = [] as Order[];
  }

}
