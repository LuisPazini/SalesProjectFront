import { Component, OnInit } from '@angular/core';
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
    private clienteService: ClienteService
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
    this.popularListaClientes();
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

  private popularListaClientes(): void {
    this.clienteService.getAll().then((clientes) => {
      this.clientes = clientes;
    })
  }
}
