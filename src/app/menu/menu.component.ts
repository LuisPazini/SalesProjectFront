import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  public static toggleExibirMenu: Subject<boolean> = new Subject<boolean>();
  exibirMenu: boolean = false;

  constructor() { 
    MenuComponent.toggleExibirMenu.subscribe(value => this.exibirMenu = value);
  }

  ngOnInit(): void {
  }

}
