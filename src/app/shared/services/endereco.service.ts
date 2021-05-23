import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Zip } from '../models/zip';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  enderecoUrl = environment.URL + '/address';

  constructor(
    private httpClient: HttpClient
  ) { }

  getEnderecoCompleto(cep: string): Promise<Zip> {
    return this.httpClient.get<Zip>(`${this.enderecoUrl}/zipcode/${cep}`).toPromise();
  }
}
