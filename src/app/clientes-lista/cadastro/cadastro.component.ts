import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from 'src/app/menu/menu.component';
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
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
    
  }

  salvar(cliente: Customer): void {
    console.log(cliente);
    this.clienteService.salvar(cliente);
  }

  remover(cliente: Customer): void {
    console.log("Removeu");
    this.clienteService.remover(cliente);
  }

  open(cliente?: Customer): void {
    if(cliente) {
      this.cliente.setValue(cliente);
    }
    this.modalService.open(this.form);
    this.desabilitarCampos();
  }

  private desabilitarCampos(): void {
    if(this.cliente.get('id')?.value) {
      this.cliente.get('cnpj')?.disable();
      this.cliente.get('companyName')?.disable();
      this.cliente.get('opening')?.disable();
    }
  }

}
