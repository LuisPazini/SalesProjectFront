import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { Customer } from '../shared/models/customer';
import { Usuario } from '../shared/models/usuario';
import { AccountService } from '../shared/services/account.service';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [] as Usuario[];
  usuariosFiltrados: Usuario[] = [] as Usuario[];

  clientes: Customer[] = [] as Customer[];

  page: number = 1;
  pageSize: number = 7;

  notFoundText: string = 'Digite ao menos 3 caracteres do nome de usuário';

  constructor(
    private usuarioService: AccountService,
    private clienteService: ClienteService
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
    this.popularListaUsuarios();
    this.clienteService.getAll().then(clientes => 
      this.clientes = clientes
    );
  }

  filtrarUsuarios(termo: string): void {
    if(termo.length < 3) {
      this.limparListaUsuarios();
      this.notFoundText = "Digite ao menos 3 caracteres do nome de usuário";
    } else {
      if(termo.length == 3) {
        this.popularListaUsuarios().then(() => 
          this.popularListaUsuariosFiltrados(termo)
        );
      }
      this.popularListaUsuariosFiltrados(termo);
      this.notFoundText = `Não foi encontrado nenhum usuário com nome "${termo}"`;
    }
  }

  private async popularListaUsuarios(): Promise<void> {
    this.usuarios = await this.usuarioService.getAll();
  }

  private popularListaUsuariosFiltrados(termo: string): void {
    this.usuariosFiltrados = this.usuarios.filter(usuario => 
      usuario.name.toLowerCase().includes(termo.toLowerCase())
    )
  }

  private limparListaUsuarios(): void {
    this.usuarios = [] as Usuario[];
    this.usuariosFiltrados = [] as Usuario[];
  }

}
