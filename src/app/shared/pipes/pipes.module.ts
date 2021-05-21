import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePipe } from './cliente.pipe';



@NgModule({
  declarations: [
    ClientePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClientePipe
  ]
})
export class PipesModule { }
