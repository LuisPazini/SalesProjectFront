import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../core/services/auth.service';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { Dashboard } from '../shared/models/dashboard';
import { Usuario } from '../shared/models/usuario';
import { DashboardService } from '../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  usuario: Usuario = {
    nome: this.authService.user.username
  } as Usuario;
  
  dashboard: Dashboard = {} as Dashboard;

  hoje: string = moment().format('L');

  dataInicial: string = moment(this.hoje).subtract(30, 'days').format('L');
  dataFinal: string = this.hoje;

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
    this.listarDadosDeDashboard();
  }
  
  listarDadosDeDashboard(): void {
    this.dashboardService.getByDateBetween(this.dataInicial, this.dataFinal).then((dashboard) => {
      this.dashboard = dashboard;
    });
  }

}
