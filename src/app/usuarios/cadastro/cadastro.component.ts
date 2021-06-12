import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { Customer } from 'src/app/shared/models/customer';
import { Usuario } from 'src/app/shared/models/usuario';
import { AccountService } from 'src/app/shared/services/account.service';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.sass']
})
export class CadastroComponent implements OnInit {

  @ViewChild('formulario') form: any;
  @Output('cadastrado') cadastrado: EventEmitter<void> = new EventEmitter<void>();

  clientes: Customer[] = [] as Customer[];
  roles = [
    { id: 1, descricao: 'Cliente' },
    { id: 2, descricao: 'Vendedor' },
    { id: 3, descricao: 'TI' }
  ]

  edicao: boolean = false;

  usuario = this.formBuilder.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    passwordHash: [''],
    role: [''],
    customerId: [''],
    id: [''],
  });

  constructor(
    private contaService: AccountService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.authService.isUserAdministrator()) {
      this.roles.push(
        { id: 4, descricao: 'Administrador' }
      );
    }
    this.listarClientes();
  }

  cadastrar(usuario: Usuario): void {
    this.usuario.markAllAsTouched();
    if(this.usuario.invalid) {
      alert('Um ou mais campos de Usuário estão inválidos. Favor verifique e tente novamente.');
      return;
    }
    this.contaService.cadastrar(usuario).then(
      res => {
        alert("Usuário cadastrado com sucesso!");
        this.modalService.dismissAll();
        this.usuario.reset();
        this.cadastrado.emit();
      },
      error => {
        console.error("Erro ao criar cadastro de usuario:\n"
        + `Status: ${error.error.status}\n` 
        + `Erro: ${error.error.title} \n`
        + `${JSON.stringify(error.error, null, 2)}`);
        alert("Ocorreu um erro ao cadastrar usuario");
      }
    );
  }

  alterarPermissao(usuario: Usuario): void {
    this.usuario.markAllAsTouched();
    if(this.usuario.invalid) {
      alert('Um ou mais campos de Usuário estão inválidos. Favor verifique e tente novamente.');
      return;
    }
    this.contaService.alterarPermissao(usuario).then(
      res => {
        alert("Usuário editado com sucesso!");
        this.modalService.dismissAll();
        this.usuario.reset();
        this.cadastrado.emit();
      },
      error => {
        console.error("Erro ao editar usuario:\n"
        + `Status: ${error.error.status}\n` 
        + `Erro: ${error.error.title} \n`
        + `${JSON.stringify(error.error, null, 2)}`);
        alert("Ocorreu um erro ao cadastrar usuario");
      }
    );
  }

  remover(usuario: Usuario): void {
    if(confirm('Tem certeza de que deseja remover este Usuário?')) {
      this.contaService.deletar(usuario).then(
        res => {
          alert("Usuário removido com sucesso!");
          this.modalService.dismissAll();
          this.usuario.reset();
          this.cadastrado.emit();
        },
        error => {
          console.error("Erro ao remover usuario:\n"
          + `Status: ${error.error.status}\n` 
          + `Erro: ${error.error.title} \n`
          + `${JSON.stringify(error.error, null, 2)}`);
          alert("Ocorreu um erro ao remover usuario");
        }
      );
    }
  }

  open(usuario?: Usuario, edicao: boolean = false): void {
    this.edicao = edicao;
    this.usuario.reset();
    if(usuario) {
      this.usuario.patchValue(usuario);
    }
    this.modalService.open(this.form);
    this.desabilitarCampos();
  }

  private desabilitarCampos(): void {
    if(this.usuario.get('id').value) {
      this.usuario.disable();
      if(this.edicao) {
        this.habilitarCamposEdicao();
      }
    } else {
      this.usuario.enable();
    }
  }

  private habilitarCamposEdicao(): void {
    this.usuario.get('role').enable();
  }

  private listarClientes(): void {
    this.clienteService.getAll().then(clientes => this.clientes = clientes);
  }

}
