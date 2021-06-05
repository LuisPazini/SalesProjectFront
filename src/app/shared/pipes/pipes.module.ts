import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePipe } from './cliente.pipe';
import { StatusPedidoPipe } from './status-pedido.pipe';
import { MoedaBrPipe } from './moeda-br.pipe';
import { RolePipe } from './role.pipe';



@NgModule({
  declarations: [
    ClientePipe,
    StatusPedidoPipe,
    MoedaBrPipe,
    RolePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClientePipe,
    StatusPedidoPipe,
    MoedaBrPipe,
    RolePipe
  ]
})
export class PipesModule { }
