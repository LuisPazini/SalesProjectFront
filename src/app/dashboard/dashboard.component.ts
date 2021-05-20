import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
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

  hoje: string = moment().format('L');
  mesAnterior: string = moment(this.hoje).subtract(30, 'days').format('L');


  constructor(
    private authService: AuthService
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
  }

}
