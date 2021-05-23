import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  cadastro: boolean = false;

  constructor(
    private authService: AuthService
  ) { 
    MenuComponent.toggleExibirMenu.next(false);
  }

  ngOnInit(): void {  
    this.authService.removerToken();
  }

}
