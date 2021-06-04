import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { Customer } from '../shared/models/customer';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.sass']
})
export class ClientesListaComponent implements OnInit {

  clientes: Customer[] = [] as Customer[];
  clientesFiltrados: Customer[] = [] as Customer[];

  page: number = 1;
  pageSize: number = 7;

  pageMobile: number = 1;
  pageSizeMobile: number = 5;

  notFoundText: string = 'Digite ao menos 3 caracteres do nome de cliente';

  constructor(
    private clienteService: ClienteService,
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
  }

  filtrarClientes(termo: string): void {
    if(termo.length < 3) {
      this.limparListaClientes();
      this.notFoundText = "Digite ao menos 3 caracteres do nome de cliente";
    } else {
      if(termo.length == 3) {
        this.popularListaClientes().then(() => 
          this.popularListaClientesFiltrados(termo)
        );
      }
      this.popularListaClientesFiltrados(termo);
      this.notFoundText = `Não foi encontrado nenhum cliente com nome "${termo}"`;
    }
  }

  private async popularListaClientes(): Promise<void> {
    this.clientes = await this.clienteService.getAll();
  }

  private popularListaClientesFiltrados(termo: string): void {
    this.clientesFiltrados = this.clientes.filter(cliente => 
      cliente.companyName.toLowerCase().includes(termo.toLowerCase())
    )
  }

  private limparListaClientes(): void {
    this.clientes = [] as Customer[];
    this.clientesFiltrados = [] as Customer[];
  }
  
}
