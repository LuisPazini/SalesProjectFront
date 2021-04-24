import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.sass']
})
export class ClientesListaComponent implements OnInit {

  cliente = this.formBuilder.group({
    cnpj: ['',
      [Validators.required,
      Validators.pattern(/^\d{2}(.\d{3}){2}\/\d{3}$/),
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
}
