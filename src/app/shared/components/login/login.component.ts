import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { 
    MenuComponent.toggleExibirMenu.next(false);
  }

  ngOnInit(): void {  }

  realizarLogin(): void {
    this.router.navigateByUrl('/dashboard');
  }

}
