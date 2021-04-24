import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';
import { Usuario } from '../shared/models/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  usuario: Usuario = {
    nome: 'AUGUSTO'
  } as Usuario;

  hoje: Date = new Date();

  constructor() { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
  }

}
