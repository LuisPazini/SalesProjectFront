import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing.component';
import { AjudaComponent } from '../ajuda/ajuda.component';

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    CadastroComponent,
    AjudaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LandingModule { }
