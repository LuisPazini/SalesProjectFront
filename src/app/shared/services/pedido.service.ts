import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private pedidoUrl: string = environment.URL + '/product'

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Order[]> {
    return this.httpClient.get<Order[]>(this.pedidoUrl).toPromise();
  }

  salvar(pedido: Order): Promise<Order> {
    if(pedido.id) {
      return this.httpClient.patch<Order>(`${this.pedidoUrl}/${pedido.id}`, pedido).toPromise();
    }
    return this.httpClient.post<Order>(this.pedidoUrl, pedido).toPromise();
  }

  cancelar(pedido: Order): Promise<void> {
    return this.httpClient.delete<void>(`${this.pedidoUrl}/${pedido.id}`).toPromise();
  }
}
