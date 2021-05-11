import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/shared/models/customer';
import { Order } from 'src/app/shared/models/order';
import { Product } from 'src/app/shared/models/product';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.sass']
})
export class CadastroComponent implements OnInit {

  @ViewChild('formulario') form: any;

  clientes: Customer[] = [] as Customer[];
  produtos: Product[] = [] as Product[];
  edicao: boolean = false;

  pedido: FormGroup;
  itens: FormArray;

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.pedido = this.formBuilder.group({
      id: [''],
      postingDate: [''],
      deliveryDate: [''],
      observation: [''],
      orderLines: this.formBuilder.array([ this.novoItem() ]),
      customerId: [''],
    });

    this.popularListaClientes();
    this.popularListaProdutos();
  }

  salvar(pedido: Order): void {
    this.pedidoService.salvar(pedido).then(
      res => {
        alert("Pedido cadastrado com sucesso!");
      },
      error => {
        console.error("Erro ao criar cadastro de pedido:\n"
        + `Status: ${error.error.status}\n` 
        + `Erro: ${error.error.title} \n`
        + `${JSON.stringify(error.error, null, 2)}`);
      }
    );
  }

  cancelar(pedido: Order): void {
    this.pedidoService.cancelar(pedido);
  }

  open(pedido?: Order, edicao: boolean = false): void {
    this.edicao = edicao;
    if(pedido) {
      this.pedido.setValue(pedido);
    }
    this.modalService.open(this.form);
    this.desabilitarCampos();
  }

  adicionarItem(): void {
    this.itens = this.pedido.get('orderLines') as FormArray;
    this.itens.push(this.novoItem());
  }

  private novoItem(): FormGroup {
    return this.formBuilder.group({
      productId: [''],
      quantity: [''],
      unitaryPrice: [''],
      additionalCosts: ['']
    });
  }

  private desabilitarCampos(): void {
    if(this.pedido.get('id')?.value) {
      this.pedido.disable();
    } else {
      this.pedido.enable();
    }
  }

  private popularListaClientes(): void {
    this.clienteService.getAll().then(clientes => this.clientes = clientes);
  }

  private popularListaProdutos(): void {
    this.produtoService.getAll().then(produtos => this.produtos = produtos);
  }

}
