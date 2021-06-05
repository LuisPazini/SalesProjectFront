import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';

import { PedidosComponent } from './pedidos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { NotaFiscalComponent } from './cadastro/nota-fiscal/nota-fiscal.component';

@NgModule({
  declarations: [
    PedidosComponent,
    CadastroComponent,
    NotaFiscalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    PipesModule
  ]
})
export class PedidosModule { }
