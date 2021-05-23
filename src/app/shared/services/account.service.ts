import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountUrl = environment.URL + '/account';

  constructor(
    private httpClient: HttpClient,
  ) { }

  login(usuario: Usuario): Promise<{user: Usuario, token: string}> {
    let credenciais = {
      username: usuario.username, 
      visiblePassword: usuario.senha
    };
    
    return this.httpClient.post<{user: Usuario, token: string}>(`${this.accountUrl}/login`, credenciais).toPromise();
  }

  cadastrar(usuario: Usuario): Promise<{user: Usuario, token: string}> {
    return this.httpClient.post<{user: Usuario, token: string}>(`${this.accountUrl}/register`, usuario).toPromise();
  }

}
