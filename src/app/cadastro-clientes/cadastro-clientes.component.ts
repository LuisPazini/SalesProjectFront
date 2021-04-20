import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.sass']
})
export class CadastroClientesComponent implements OnInit {

  constructor() { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
  }

}
