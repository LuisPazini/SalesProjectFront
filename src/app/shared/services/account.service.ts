import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../enums/role.enum';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountUrl = environment.URL + '/account';

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(): Promise<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.accountUrl}`).toPromise();
  }

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

  alterarSenha(alteracaoSenha: {currentPassword: string, newPassword: string, confirmPassword: string}): Promise<Usuario> {
    return this.httpClient.patch<Usuario>(`${this.accountUrl}/change-password`, alteracaoSenha).toPromise();
  }

  alterarPermissao(usuario: Usuario, role: Role): Promise<Usuario> {
    let params = new HttpParams().set('id', `${usuario.id}`);
    return this.httpClient.patch<Usuario>(`${this.accountUrl}/change-role`, { role: role }, { params: params }).toPromise();
  }

  deletar(usuario: Usuario): Promise<void> {
    return this.httpClient.delete<void>(`${this.accountUrl}/${usuario.id}`).toPromise();
  }



}
