import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService {

  private notaFiscalUrl = environment.URL + '/invoice';

  constructor(
    private httpClient: HttpClient
  ) { }

  getIdNotaFiscal(pedido: Order): Promise<{idPlugNotasIntegration: string}> {
    return this.httpClient.get<{idPlugNotasIntegration: string}>(`${this.notaFiscalUrl}/plug-notas-id/${pedido.id}`).toPromise();
  }

  gerarNotaFiscal(pedido: Order): Promise<Invoice> {
    return this.httpClient.post<Invoice>(`${this.notaFiscalUrl}/${pedido.id}`, null).toPromise();
  }

  emitirNotaFiscal(notaFiscal: Invoice): Promise<void> {
    return this.httpClient.patch<void>(`${this.notaFiscalUrl}/send/${notaFiscal.id}`, null).toPromise();
  }

  baixarNotaFiscalPDF(idNotaFiscal: string): Promise<string> {
    return this.httpClient.get<string>(`${this.notaFiscalUrl}/download-pdf/${idNotaFiscal}`).toPromise();
  }

  baixarNotaFiscalXML(idNotaFiscal: string): Promise<string> {
    return this.httpClient.get<string>(`${this.notaFiscalUrl}/download-xml/${idNotaFiscal}`).toPromise();
  }
}
