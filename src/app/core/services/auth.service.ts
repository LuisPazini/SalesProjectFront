import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/models/usuario';
import { AccountService } from 'src/app/shared/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  key = 'Authorization';

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

  removerToken(): void {
    sessionStorage.removeItem(this.key);
  }

  isUserAuthenticated(): boolean {
    let _token = this.getToken();
    return _token? true : false;
  }

  getUserRole(): string {
    let _token = this.getToken();
    let _decoded: any = jwt_decode(_token);
    return _decoded.role;
  }

  getUserName(): string {
    let _token = this.getToken();
    let _decoded: any = jwt_decode(_token);
    return 'Augusto';
  }

  private async login(usuario: Usuario): Promise<string> {
    let _token = (await this.contaService.login(usuario)).token;
    sessionStorage.setItem(this.key, _token);
    return _token;
  }

  private getExpirationToken(token: string): Date {
    let _decoded: JwtPayload = jwt_decode(token);
    let _tempo = _decoded.exp!;
    let _expiracao = new Date(_tempo * 1000);
    
    return _expiracao;
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.key);
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
