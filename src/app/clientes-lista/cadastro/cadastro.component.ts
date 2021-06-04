import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { TIPOS_ENDERECO } from 'src/app/shared/consts/tipos-endereco.const';
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
  
  tiposEndereco = TIPOS_ENDERECO;
  
  cliente = this.formBuilder.group({
    cnpj: ['', Validators.required],
    companyName: ['', Validators.required],
    stateRegistration: ['', Validators.required],
    email: ['', Validators.required],
    opening: ['', Validators.required],
    phone: ['', Validators.required],
    clientSince: [''],
    municipalRegistration: [''],
    adresses: this.formBuilder.array([]),
    contacts: this.formBuilder.array([]),
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
    if(this.cliente.invalid) {
      alert('Um ou mais campos de Cliente estão inválidos. Favor verifique e tente novamente.');
      return;
    };
    this.clienteService.salvar(cliente).then(
      res => {
        alert("Cliente cadastrado com sucesso!");
        this.modalService.dismissAll();
        this.cliente.reset();
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
    this.addresses.clear();
    this.contacts.clear();
    if(clienteSelecionado) {
      this.clienteService.getCliente(clienteSelecionado).then(cliente => {
        cliente.adresses.forEach(() => this.adicionarEndereco());
        cliente.contacts.forEach(() => this.adicionarContato());
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
    if(this.addresses.length == 1) {
      alert('É preciso ter pelo menos 1 endereço de cliente cadastrado.');
      return;
    }
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
