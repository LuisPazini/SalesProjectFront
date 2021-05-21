import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Role } from 'src/app/shared/enums/role.enum';
import { Usuario } from 'src/app/shared/models/usuario';
import { AccountService } from 'src/app/shared/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  key = 'Authorization';

  user: Usuario = {} as Usuario;

  sessaoExpiradaSubject: Subject<void> = new Subject<void>();

  constructor(
    private contaService: AccountService,
    private router: Router
  ) { }

  async canLogin(usuario: Usuario): Promise<boolean> {
    await this.login(usuario);
    let _token = this.getToken();

    if(_token) {
      this.tokenCountdownInit();
      return true;
    }
    return false;
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.key);
  }

  removerToken(): void {
    sessionStorage.removeItem(this.key);
  }

  isUserAuthenticated(): boolean {
    let _token = this.getToken();
    return _token? true : false;
  }

  isUserAdministrator(): boolean {
    return this.user.role == Role.ADMINISTRADOR;
  }

  isUserITOrHigher(): boolean {
    return this.user.role >= Role.TI;
  }

  isUserSellerOrHigher(): boolean {
    return this.user.role >= Role.VENDEDOR;
  }

  isUserCustomer(): boolean {
    return this.user.role == Role.CLIENTE;
  }

  isUserIT(): boolean {
    return this.user.role == Role.TI;
  }

  private async login(usuario: Usuario): Promise<string> {
    let _token: string;
    await this.contaService.login(usuario).then((response) => {
      _token = response.token;
      this.user = response.user;
    });
    sessionStorage.setItem(this.key, _token);
    return _token;
  }

  private getExpirationToken(token: string): Date {
    let _decoded: JwtPayload = jwt_decode(token);
    let _tempo = _decoded.exp!;
    let _expiracao = new Date(_tempo * 1000);
    
    return _expiracao;
  }

  private tokenCountdownInit(): void {
    let _token = this.getToken();

    this.sessaoExpiradaSubject.pipe(take(1)).subscribe(() => {
      if(_token) {
        var expTime = this.getExpirationToken(_token).valueOf() - new Date().valueOf();
        setTimeout(() => {
          alert(`Sua sessão expirou.\nFaça login novamente!`);
          sessionStorage.removeItem("Authorization");
          this.router.navigate(['login']);
        }, expTime);
      }
    });
  }

}
