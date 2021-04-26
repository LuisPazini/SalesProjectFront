import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  
  cliente = this.formBuilder.group({
    cnpj: ['',
      [Validators.required,
      Validators.pattern(/^\d{2}(.\d{3}){2}$/),
      /* Validators.minLength(14), 
      Validators.maxLength(14) */]
    ],
    companyName: ['', Validators.required],
    opening: [''],
    phone: [''],
    stateRegistration: [''],
    municipalRegistration: [''],
  });
  clientes = this.clienteService.getAll();

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { 
    MenuComponent.toggleExibirMenu.next(true);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.cliente.valid ?
    console.log(this.cliente.value) :
    console.log('nope')
  }

  adicionarCliente(): void {
    this.clienteService.getAll().then(clientes => 
      console.log(clientes)
    ).catch(error => console.log(error.message));
  }

  open(cliente?: Customer): void {

    this.modalService.open(this.form);
  }

}
