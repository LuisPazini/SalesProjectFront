import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Dashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboardUrl = environment.URL + "/order/dashboard"

  constructor(
    private httpClient: HttpClient,
  ) { }

  getByDateBetween(dataInicial: string, dataFinal: string): Promise<Dashboard> {
    return this.httpClient.get<Dashboard>(`${this.dashboardUrl}`, 
      { params: { StartDate: dataInicial, EndDate: dataFinal } }
    ).toPromise();
  }
}
