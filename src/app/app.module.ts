import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { CardComponent } from './dashboard/card/card.component';
import { ClientesModule } from './clientes-lista/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { httpInterceptorProviders } from './core/http-interceptors';
import { LandingModule } from './shared/components/login/landing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CadastroComponent } from './usuarios/cadastro/cadastro.component';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MenuComponent,
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
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
