import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  public static toggleExibirMenu: Subject<boolean> = new Subject<boolean>();

  isMenuCollapsed: boolean = true;
  exibirMenu: boolean = false;

  constructor(
    private authService: AuthService
  ) { 
    MenuComponent.toggleExibirMenu.subscribe(value => this.exibirMenu = value);
  }

  ngOnInit(): void {
  }

  get username() {
    return this.authService.getUser();
  }

  isAdministrator(): boolean {
    return this.authService.isUserAdministrator();
  }

  isITOrHigher(): boolean {
    return this.authService.isUserITOrHigher();
  }

  isSellerOrHigher(): boolean {
    return this.authService.isUserSellerOrHigher();
  }

  isNotIT(): boolean {
    return !this.authService.isUserIT();
  }

}
