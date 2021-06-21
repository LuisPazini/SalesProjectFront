import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private pedidoUrl: string = environment.URL + '/order';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  getAll(filtros: any): Promise<Order[]> {
    let params = this.montarParametrosDeListagem(filtros);

    if(this.authService.isUserCustomer()) {
      params = params.append('CustomerId', this.authService.getCustomer());
    }
    return this.httpClient.get<Order[]>(`${this.pedidoUrl}/filter`, { params: params }).toPromise();
  }

  salvar(pedido: Order): Promise<Order> {
    if(pedido.id) {
      return this.httpClient.patch<Order>(`${this.pedidoUrl}/${pedido.id}`, pedido).toPromise();
    }
    return this.httpClient.post<Order>(this.pedidoUrl, pedido).toPromise();
  }

  aprovar(pedido: Order): Promise<void> {
    return this.httpClient.patch<void>(`${this.pedidoUrl}/approve/${pedido.id}`, pedido).toPromise();
  }

  cancelar(pedido: Order): Promise<void> {
    return this.httpClient.patch<void>(`${this.pedidoUrl}/cancel/${pedido.id}`, pedido).toPromise();
  }

  private montarParametrosDeListagem(filtros: any): HttpParams {
    let params = new HttpParams();

    if(filtros.dataInicial) {
      params = params.append('StartDate', filtros.dataInicial);
    }
    if(filtros.dataFinal) {
      params = params.append('EndDate', filtros.dataFinal);
    }
    if(filtros.cliente) {
      params = params.append('CustomerId', filtros.cliente.id);
    }
    if(filtros.status) {
      params = params.append('Status', filtros.status);
    }
    return params;
  }
}
