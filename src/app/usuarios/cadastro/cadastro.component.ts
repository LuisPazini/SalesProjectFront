import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    { id: 3, descricao: 'TI' },
    { id: 4, descricao: 'Administrador' }
  ]

  edicao: boolean = false;

  usuario = this.formBuilder.group({
    username: [''],
    name: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
    passwordHash: [''],
    role: [''],
    customerId: [''],
    id: [''],
  });

  constructor(
    private contaService: AccountService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  cadastrar(usuario: Usuario): void {
    this.contaService.cadastrar(usuario).then(
      res => {
        alert("Usuário cadastrado com sucesso!");
        this.modalService.dismissAll();
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

  remover(usuario: Usuario): void {
    this.contaService.deletar(usuario);
  }

  open(usuario?: Usuario, edicao: boolean = false): void {
    this.edicao = edicao;
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
    this.usuario.get('name').enable();
    this.usuario.get('email').enable();
    this.usuario.get('senha').enable();
    this.usuario.get('role').enable();
  }

  private listarClientes(): void {
    this.clienteService.getAll().then(clientes => this.clientes = clientes);
  }

}
