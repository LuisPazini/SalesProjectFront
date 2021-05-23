import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/shared/models/customer';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { EnderecoService } from 'src/app/shared/services/endereco.service';

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
    stateRegistration: [''],
    opening: [''],
    phone: [''],
    clientSince: [''],
    municipalRegistration: [''],
    addresses: this.formBuilder.array([ this.novoEndereco() ]),
    contacts: this.formBuilder.array([ this.novoContato() ]),
    products: [this.formBuilder.array([])],
    user: [''],
    valid: [''],
    notifications: ['']
  });

  constructor(
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  get addresses() {
    return this.cliente.get('addresses') as FormArray;
  }

  get contacts() {
    return this.cliente.get('contacts') as FormArray;
  }

  salvar(cliente: Customer): void {
    this.clienteService.salvar(cliente).then(
      res => {

        alert("Cliente cadastrado com sucesso!");
        console.log(res.id);
      },
      error => {
        this.exibirErro(error);
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

  adicionarEndereco(): void {
    this.addresses.push(this.novoEndereco());
  }

  adicionarContato(): void {
    this.contacts.push(this.novoContato());
  }

  removerEndereco(index: number): void {
    this.addresses.removeAt(index);
  }

  removerContato(index: number): void {
    this.contacts.removeAt(index);
  }

  pesquisarEndereco(index: number): void {
    let endereco = this.addresses.at(index);
    this.enderecoService.getEnderecoCompleto(endereco.get('zipCode').value).then(zip => {
      endereco.get('neighborhood').setValue(zip.district);
      endereco.get('street').setValue(zip.address);
      endereco.get('city').setValue(zip.city);
      endereco.get('state').setValue(zip.state);
    });
  }

  private novoEndereco(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      description: [''],
      zipCode: [''],
      type: [''],
      street: [''],
      number: [''],
      neighborhood: [''],
      city: [''],
      state: ['']
    })
  }

  private novoContato(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      whatsApp: [''],
      phone: ['']
    })
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

  private exibirErro(error: any): void {
    console.error("Erro ao criar cadastro de cliente:\n"
        + `Status: ${error.error.status}\n` 
        + `Erro: ${error.error.title} \n`
        + `${JSON.stringify(error.error, null, 2)}`
      );
  }
}
