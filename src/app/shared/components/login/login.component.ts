import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from '../../enums/role.enum';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  usuario = this.formBuilder.group({
    username: [''],
    senha: ['']
  })

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
    ) { 
    MenuComponent.toggleExibirMenu.next(false);
  }

  ngOnInit(): void {  
    this.authService.removerToken();
  }

  async realizarLogin(): Promise<void> {
    this.authService.canLogin(this.usuario.value).then(canLogin => {
      if(canLogin) {
        if(this.authService.isUserAdministrator()) {
          this.router.navigate(['dashboard']);
        } else if(this.authService.isUserIT()) {
          this.router.navigate(['usuarios']);
        } else {
          this.router.navigate(['pedidos']);
        }
      }
    }).catch(error => {
      if(error.status == 400) {
        alert('Usuário/senha inválidos')
      } else {
        alert(
          `Ocorreu um erro ao realizar login: \n`
          + error.error.detail
        )
      }
    });
  }

}
