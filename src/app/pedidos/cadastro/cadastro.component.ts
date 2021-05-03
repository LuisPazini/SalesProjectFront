import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/shared/models/order';
import { PedidoService } from 'src/app/shared/services/pedido.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.sass']
})
export class CadastroComponent implements OnInit {

  @ViewChild('formulario') form: any;
  edicao: boolean = false;

  pedido = this.formBuilder.group({
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
    private pedidoService: PedidoService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  salvar(pedido: Order): void {
    this.pedidoService.salvar(pedido).then(
      res => {
        alert("Cliente cadastrado com sucesso!");
      },
      error => {
        console.error("Erro ao criar cadastro de pedido:\n"
        + `Status: ${error.error.status}\n` 
        + `Erro: ${error.error.title} \n`
        + `${JSON.stringify(error.error, null, 2)}`);
      }
    );
  }

  remover(pedido: Order): void {
    this.pedidoService.remover(pedido);
  }

  open(pedido?: Order, edicao: boolean = false): void {
    this.edicao = edicao;
    if(pedido) {
      this.pedido.setValue(pedido);
    }
    this.modalService.open(this.form);
    this.desabilitarCampos();
  }

  private desabilitarCampos(): void {
    if(this.pedido.get('id')?.value) {
      this.pedido.disable();
      if(this.edicao) {
        this.pedido.get('phone')?.enable();
        this.pedido.get('stateRegistration')?.enable();
        this.pedido.get('municipalRegistration')?.enable();
      }
    } else {
      this.pedido.enable();
    }
  }

}
