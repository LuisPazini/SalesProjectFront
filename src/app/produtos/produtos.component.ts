import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { Product } from '../shared/models/product';
import { ProdutoService } from '../shared/services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.sass']
})
export class ProdutosComponent implements OnInit {

  produtos: Product[] = [] as Product[];
  produtosFiltrados: Product[] = [] as Product[];

  page: number = 1;
  pageSize: number = 7;

  notFoundText: string = 'Digite ao menos 3 caracteres do nome de produto';

  constructor(
    private produtoService: ProdutoService,
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
  }

  filtrarProdutos(termo: string): void {
    if(termo.length < 3) {
      this.limparListaProdutos();
      this.notFoundText = "Digite ao menos 3 caracteres do nome de produto";
    } else {
      if(termo.length == 3) {
        this.popularListaProdutos(termo).then(() => 
          this.popularListaProdutosFiltrados(termo)
        );
      }
      this.popularListaProdutosFiltrados(termo);
      this.notFoundText = `Não foi encontrado nenhum produto com nome "${termo}"`;
    }
  }

  private async popularListaProdutos(name: string): Promise<void> {
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
}
