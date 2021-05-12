import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login/login.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { CardComponent } from './dashboard/card/card.component';
import { ClientesModule } from './clientes-lista/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    DashboardComponent,
    MenuComponent,
    CardComponent,
  ],
  imports: [
    ClientesModule,
    ProdutosModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
