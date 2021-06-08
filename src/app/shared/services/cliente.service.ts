import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteUrl: string = environment.URL + '/customer'
  private clienteCompletoUrl: string = environment.URL + '/complete/customer'

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Customer[]> {
    return this.httpClient.get<Customer[]>(this.clienteUrl).toPromise();
  }

  getClienteByCNPJ(cnpj: string): Promise<Empresa> {
    return this.httpClient.get<Empresa>(`${this.clienteUrl}/cnpj/${cnpj}`).toPromise();
  }

  getCliente(cliente: Customer): Promise<Customer> {
    return this.httpClient.get<Customer>(`${this.clienteCompletoUrl}/${cliente.id}`).toPromise();
  }

  salvar(cliente: Customer): Promise<Customer> {
    if(cliente.id) {
      return this.httpClient.patch<Customer>(`${this.clienteCompletoUrl}/${cliente.id}`, cliente).toPromise();
    }
    return this.httpClient.post<Customer>(`${this.clienteCompletoUrl}`, cliente).toPromise();
  }

  remover(cliente: Customer): Promise<void> {
    debugger
    return this.httpClient.delete<void>(`${this.clienteUrl}/${cliente.id}`).toPromise();
  }

}
