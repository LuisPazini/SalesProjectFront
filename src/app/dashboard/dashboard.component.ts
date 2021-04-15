import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';

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

  constructor() { }

  ngOnInit(): void {
  }

}
