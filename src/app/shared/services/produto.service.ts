import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtoUrl: string = environment.URL + '/product'

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Product[]> {
    return this.httpClient.get<Product[]>(this.produtoUrl).toPromise();
  }

  salvar(produto: Product): Promise<Product> {
    if(produto.id) {
      return this.httpClient.patch<Product>(`${this.produtoUrl}/${produto.id}`, produto).toPromise();
    }
    return this.httpClient.post<Product>(this.produtoUrl, produto).toPromise();
  }

  remover(produto: Product): Promise<void> {
    return this.httpClient.delete<void>(`${this.produtoUrl}/${produto.id}`).toPromise();
  }
}
