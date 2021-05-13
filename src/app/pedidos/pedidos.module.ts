import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

import { NgSelectModule } from '@ng-select/ng-select';
import { PedidosComponent } from './pedidos.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  declarations: [
    PedidosComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgSelectModule
  ]
})
export class PedidosModule { }
