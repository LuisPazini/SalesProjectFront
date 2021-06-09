import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { ClientesModule } from './clientes-lista/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { httpInterceptorProviders } from './core/http-interceptors';
import { LandingModule } from './shared/components/login/landing.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AlterarSenhaComponent } from './shared/components/menu/alterar-senha/alterar-senha.component';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MenuComponent,
    AlterarSenhaComponent,
  ],
  imports: [
    LandingModule,
    DashboardModule,
    ClientesModule,
    ProdutosModule,
    PedidosModule,
    UsuariosModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    NgSelectModule
  ],
  providers: [
    httpInterceptorProviders,
    {provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
