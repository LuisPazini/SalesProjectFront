import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
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
  @Output('cadastrado') cadastrado: EventEmitter<void> = new EventEmitter<void>();
  
  tiposEndereco = [
    { id: 1, tipo: 'Cobrança' },
    { id: 2, tipo: 'Entrega' },
    { id: 3, tipo: 'Outro' }
  ]
  
  cliente = this.formBuilder.group({
    cnpj: [''],
    companyName: [''],
    stateRegistration: [''],
    email: [''],
    opening: [''],
    phone: [''],
    clientSince: [''],
    municipalRegistration: [''],
    adresses: this.formBuilder.array([ this.novoEndereco() ]),
    contacts: this.formBuilder.array([ this.novoContato() ]),
    products: this.formBuilder.array([]),
    id: [''],
  });
  
  edicao: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  get addresses() {
    return this.cliente.get('adresses') as FormArray;
  }

  get contacts() {
    return this.cliente.get('contacts') as FormArray;
  }

  salvar(cliente: Customer): void {
    this.clienteService.salvar(cliente).then(
      res => {
        alert("Cliente cadastrado com sucesso!");
        this.modalService.dismissAll();
        this.cadastrado.emit();
      },
      error => {
        this.exibirErro(error);
      }
    );
  }

  remover(cliente: Customer): void {
    this.clienteService.remover(cliente);
  }

  open(clienteSelecionado?: Customer, edicao: boolean = false): void {
    this.edicao = edicao;
    if(clienteSelecionado) {
      this.clienteService.getCliente(clienteSelecionado).then(cliente => {
        this.cliente.patchValue(cliente);
        this.cliente.patchValue({ opening: moment(cliente.opening).format('YYYY-MM-DD') });
        this.desabilitarCampos();
      });
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

  consultarCNPJ(): void {
    let cnpj = this.cliente.get('cnpj').value;
    this.clienteService.getClienteByCNPJ(cnpj).then(empresa => {
      this.cliente.get('companyName').setValue(empresa.nome);
      this.cliente.get('opening').setValue(moment(empresa.abertura, 'DD/MM/YYYY').format('YYYY-MM-DD'));
      this.cliente.get('phone').setValue(empresa.telefone.split('/')[0]);
    })
  }

  consultarEndereco(index: number): void {
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
    if(this.cliente.get('id').value) {
      this.cliente.disable();
      if(this.edicao) {
        this.cliente.get('phone').enable();
        this.cliente.get('email').enable();
        this.cliente.get('municipalRegistration').enable();
        this.cliente.get('adresses').enable();
        this.cliente.get('contacts').enable();
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
