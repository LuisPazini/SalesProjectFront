import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { Customer } from '../shared/models/customer';
import { Product } from '../shared/models/product';
import { ClienteService } from '../shared/services/cliente.service';
import { ProdutoService } from '../shared/services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.sass']
})
export class ProdutosComponent implements OnInit {

  produtos: Product[] = [] as Product[];
  produtosFiltrados: Product[] = [] as Product[];

  clientes: Customer[] = [] as Customer[];

  clienteSelecionado: Customer;

  page: number = 1;
  pageSize: number = 7;

  pageMobile: number = 1;
  pageSizeMobile: number = 5;

  notFoundText: string = 'Digite ao menos 3 caracteres do nome de produto ou selecione um cliente';

  constructor(
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private authService: AuthService
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
    this.popularListaClientes().then(() =>{
      if(this.isUserCustomer()) {
        this.clienteSelecionado = this.clientes.find(cliente => cliente.id == this.authService.getCustomer());
        this.popularListaProdutosByCliente();
      }
    });
  }

  filtrarProdutos(termo: string): void {
    if(termo.length < 3 && !this.clienteSelecionado) {
      this.limparListaProdutos();
      this.notFoundText = "Digite ao menos 3 caracteres do nome de produto ou selecione um cliente";
    } else {
      if(termo.length == 3 && !this.clienteSelecionado) {
        this.popularListaProdutosByName(termo).then(() => 
          this.popularListaProdutosFiltrados(termo)
        );
      }
      this.popularListaProdutosFiltrados(termo);
      this.notFoundText = `Não foi encontrado nenhum produto com nome "${termo}"`;
    }
  }

  popularListaProdutosByCliente(): void {
    if(this.clienteSelecionado) {
      this.produtoService.getByCliente(this.clienteSelecionado.id).then(
        produtos => {
          this.produtos = produtos;
          this.produtosFiltrados = produtos;
        },
        error => {
          if(error.status == 404) {
            this.notFoundText = `Não foram encontrador produtos para o cliente "${this.clienteSelecionado.companyName}"`;
            this.limparListaProdutos();
          }
        }
      )
    } else {
      this.limparListaProdutos();
      this.notFoundText = "Digite ao menos 3 caracteres do nome de produto ou selecione um cliente";
    }
  }

  isUserCustomer(): boolean {
    return this.authService.isUserCustomer();
  }

  private async popularListaProdutosByName(name: string): Promise<void> {
    this.produtos = await this.produtoService.getByName(name);
  }

  private popularListaProdutosFiltrados(termo: string): void {
    this.produtosFiltrados = this.produtos.filter(produto => 
      produto.name.toLowerCase().includes(termo.toLowerCase())
    )
  }

  private limparListaProdutos(): void {
    this.produtos = [] as Product[];
    this.produtosFiltrados = [] as Product[];
  }

  private popularListaClientes(): Promise<void> {
    return this.clienteService.getAll().then((clientes) => {
      this.clientes = clientes;
    });
  }
}
