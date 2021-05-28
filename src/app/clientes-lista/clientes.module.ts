import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesListaComponent } from './clientes-lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    ClientesListaComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    NgSelectModule
  ]
})
export class ClientesModule { }
