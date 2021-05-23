import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.sass']
})
export class CadastroComponent implements OnInit {

  @Output('cadastrar') exibirCadastro: EventEmitter<boolean> = new EventEmitter<boolean>();

  usuario = this.formBuilder.group({
    username: [''],
    name: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
    role: [4],
    customerId: ['']
  })

  constructor(
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  async cadastrar(usuario: Usuario): Promise<void> {
    console.log(usuario)
    this.accountService.cadastrar(usuario).then(() =>
      alert('Cadastro realizado com sucesso!')
    ).catch(error => {
      alert(
          `Ocorreu um erro ao realizar login: \n`
          + error.error.detail
        )
    });
    this.sairDoCadastro();
  }

  sairDoCadastro(): void {
    this.exibirCadastro.emit(false);
  }
}
