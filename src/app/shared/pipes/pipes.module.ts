import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePipe } from './cliente.pipe';
import { StatusPedidoPipe } from './status-pedido.pipe';



@NgModule({
  declarations: [
    ClientePipe,
    StatusPedidoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClientePipe,
    StatusPedidoPipe
  ]
})
export class PipesModule { }
