import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { AccountService } from 'src/app/shared/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  key = 'Authorization';

  constructor(
    private contaService: AccountService,
  ) { }

  async canLogin(usuario: Usuario): Promise<boolean> {
    await this.login(usuario);
    let token = sessionStorage.getItem(this.key);
    return token? true : false;
  }

  removerToken(): void {
    sessionStorage.removeItem(this.key);
  }

  getUserRole(): string {
    let token = sessionStorage.getItem(this.key);
    return 'Administrator';
  }

  getUserName(): string {
    let token = sessionStorage.getItem(this.key);
    return 'Augusto';
  }

  private async login(usuario: Usuario): Promise<string> {
    let token = (await this.contaService.login(usuario)).token;
    sessionStorage.setItem(this.key, token);
    return token;
  }
}
