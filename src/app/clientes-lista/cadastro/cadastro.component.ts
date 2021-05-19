import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/shared/models/customer';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.sass']
})
export class CadastroComponent implements OnInit {

  @ViewChild('formulario') form: any;
  edicao: boolean = false;

  cliente = this.formBuilder.group({
    id: [''],
    cnpj: [''],
    companyName: [''],
    opening: [''],
    phone: [''],
    stateRegistration: [''],
    municipalRegistration: [''],
    clientSince: [''],
    adresses: [''],
    contacts: [''],
    products: [''],
    valid: [''],
    notifications: ['']
  });

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  salvar(cliente: Customer): void {
    this.clienteService.salvar(cliente).then(
      res => {
        alert("Cliente cadastrado com sucesso!");
      },
      error => {
        console.error("Erro ao criar cadastro de cliente:\n"
        + `Status: ${error.error.status}\n` 
        + `Erro: ${error.error.title} \n`
        + `${JSON.stringify(error.error, null, 2)}`);
      }
    );
  }

  remover(cliente: Customer): void {
    this.clienteService.remover(cliente);
  }

  open(cliente?: Customer, edicao: boolean = false): void {
    this.edicao = edicao;
    if(cliente) {
      this.cliente.setValue(cliente);
    }
    this.modalService.open(this.form, { size: 'lg' });
    this.desabilitarCampos();
  }

  private desabilitarCampos(): void {
    if(this.cliente.get('id')?.value) {
      this.cliente.disable();
      if(this.edicao) {
        this.cliente.get('phone')?.enable();
        this.cliente.get('stateRegistration')?.enable();
        this.cliente.get('municipalRegistration')?.enable();
      }
    } else {
      this.cliente.enable();
    }
  }

}
