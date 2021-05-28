import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    MenuComponent.toggleExibirMenu.next(true);
  }

  redirecionar(): string {
    if(this.authService.isUserAdministrator()) {
      return '/dashboard';
    } else if(this.authService.isUserIT()) {
      return '/usuarios';
    } else {
      return '/pedidos';
    }
  }
}
