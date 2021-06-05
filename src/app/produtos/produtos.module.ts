import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    ProdutosComponent,
    CadastroComponent
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
export class ProdutosModule { }
