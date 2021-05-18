import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { Usuario } from '../shared/models/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  usuario: Usuario = {
    nome: this.authService.getUserName()
  } as Usuario;

  hoje: Date = new Date();

  constructor(
    private authService: AuthService
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
  }

}
