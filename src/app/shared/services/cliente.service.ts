import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteUrl: string = environment.URL + '/customer'

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Customer[]> {
    return this.httpClient.get<Customer[]>(this.clienteUrl).toPromise();
  }

  salvar(cliente: Customer): Promise<Customer> {
    if(cliente.id) {
      return this.httpClient.patch<Customer>(`${this.clienteUrl}/${cliente.id}`, cliente).toPromise();
    }
    return this.httpClient.post<Customer>(this.clienteUrl, cliente).toPromise();
  }

  remover(cliente: Customer): Promise<void> {
    return this.httpClient.delete<void>(`${this.clienteUrl}/${cliente.id}`).toPromise();
  }
}
