import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.sass']
})
export class AlterarSenhaComponent implements OnInit {

  @ViewChild('formulario') form: any;

  usuario = this.formBuilder.group({
    username: [''],
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(
    private contaService: AccountService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  open(username: string): void {
    this.usuario.reset();
    this.usuario.get('username').setValue(username);
    this.desabilitarCampos();
    this.modalService.open(this.form); 
  }

  alterarSenha(usuario): void {
    this.usuario.markAllAsTouched();
    if(this.usuario.invalid) {
      alert('Um ou mais campos estão inválidos. Favor verifique e tente novamente.');
      return;
    }
    if(!this.senhasCoincidem()) {
      alert('\'Nova Senha\' e \'Confirmar Senha\' não coincidem. Verifique e tente novamente');
      return;
    }
    this.contaService.alterarSenha(usuario).then(
      res => {
        alert(`Senha alterada com sucesso!\nFavor realize login novamente`);
        this.modalService.dismissAll();
        this.router.navigate(['login']);
      },
      error => {
        console.error("Erro ao criar cadastro de pedido:\n"
          + `Status: ${error.error.status}\n` 
          + `Erro: ${error.error.title} \n`
          + `${JSON.stringify(error.error, null, 2)}`);
      }
    );
  }

  private senhasCoincidem(): boolean {
    return this.usuario.get('newPassword').value == this.usuario.get('confirmPassword').value;
  }

  private desabilitarCampos(): void {
    this.usuario.get('username').disable();
  }

}
