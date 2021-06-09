import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { StatusPedido } from 'src/app/shared/enums/status-pedido.enum';
import { Customer } from 'src/app/shared/models/customer';
import { Order } from 'src/app/shared/models/order';
import { Product } from 'src/app/shared/models/product';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { NotaFiscalService } from 'src/app/shared/services/nota-fiscal.service';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { ProdutoService } from 'src/app/shared/services/produto.service';
import { NotaFiscalComponent } from './nota-fiscal/nota-fiscal.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.sass']
})
export class CadastroComponent implements OnInit {

  @ViewChild('formulario') form: any;
  @ViewChild('notaFiscal') notaFiscalModal: NotaFiscalComponent;
  @Output('cadastrado') cadastrado: EventEmitter<void> = new EventEmitter<void>();

  clientes: Customer[] = [] as Customer[];
  produtos: Product[] = [] as Product[];
  
  hoje: string = moment().format('YYYY-MM-DD');

  pedido = this.formBuilder.group({
    postingDate: [''],
    deliveryDate: ['', Validators.required],
    status: [''],
    totalOrder: [''],
    observation: [''],
    orderLines: this.formBuilder.array([]),
    customerId: ['', Validators.required],
    valid: [''],
    notifications: [''],
    id: [''],
  });

  itens = this.pedido.get('orderLines') as FormArray; 

  edicao: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private notaFiscalService: NotaFiscalService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.popularListaClientes();
    if(!this.isNovoPedido()) {
      this.popularListaProdutos();
    }
  }

  get orderLines() {
    return this.pedido.get('orderLines') as FormArray;
  }

  salvar(pedido: Order): void {
    this.pedido.markAllAsTouched();
    if(this.pedido.invalid) {
      alert('Um ou mais campos de Pedido estão inválidos. Favor verifique e tente novamente.');
      return;
    }
    this.converterCamposNumber();
    this.pedidoService.salvar(pedido).then(
      res => {
        alert("Pedido cadastrado com sucesso!");
        this.modalService.dismissAll();
        this.cadastrado.emit();
      },
      error => {
        alert("Ocorreu um erro ao cadastrar Pedido. Tente novamente mais tarde.");
        this.exibirErro(error);
      }
    );
      
  }

  aprovarPedido(pedido: Order): void {
    this.pedidoService.aprovar(pedido).then(
      res => {
        alert("Pedido aprovado com sucesso!");
        this.modalService.dismissAll();
        this.pedido.reset();
        this.cadastrado.emit();
      },
      error => {
        alert("Ocorreu um erro ao aprovar Pedido. Tente novamente mais tarde.");
        this.exibirErro(error);
      }
    );
  }

  emitirNotaFiscal(pedido: Order): void {
    this.notaFiscalService.gerarNotaFiscal(pedido).then(
      notaFiscal => {
        this.notaFiscalService.emitirNotaFiscal(notaFiscal).then(
          res => {
            console.log(notaFiscal.id);
            alert("Nota Fiscal emitida com sucesso!");
            this.modalService.dismissAll();
            this.pedido.reset();
            this.cadastrado.emit();
          },
          error => {
            alert("Ocorreu um erro ao emitir Nota Fiscal. Tente novamente mais tarde.");
            this.exibirErro(error);
          }
        );
      },
      error => {
        alert("Ocorreu um erro ao gerar Nota Fiscal. Tente novamente mais tarde.");
        this.exibirErro(error);
      }
    );
  }

  async baixarNotaFiscal(pedido: Order): Promise<void> {
    let idNotaFiscal = await this.notaFiscalService.getIdNotaFiscal(pedido);
    this.notaFiscalModal.open(idNotaFiscal.idPlugNotasIntegration);
  }

  cancelar(pedido: Order): void {
    this.pedidoService.cancelar(pedido).then(
      res => {
        alert("Pedido cancelado com sucesso!");
        this.modalService.dismissAll();
        this.cadastrado.emit();
      },
      error => {
        alert("Ocorreu um erro ao cancelar Pedido. Tente novamente mais tarde.");
        this.exibirErro(error);
      }
    );
  }

  open(pedido?: Order, edicao: boolean = false): void {
    this.edicao = edicao;
    this.orderLines.clear();
    if(pedido) {
      pedido.orderLines.forEach(() => this.adicionarItem());
      this.pedido.patchValue(pedido);
      this.popularListaProdutos();
      this.pedido.patchValue(
        {
          postingDate: moment(pedido.postingDate).format('YYYY-MM-DD'),
          deliveryDate: moment(pedido.deliveryDate).format('YYYY-MM-DD'),
        }
      );
    } else {
      this.pedido.get('postingDate').setValue(this.hoje);
      this.adicionarItem();
    }
    if(this.isPedidoAprovado() || this.isPedidoFaturado()) {
      this.edicao = false;
    }
    this.modalService.open(this.form, { size: 'xl' });
    this.desabilitarCampos();
  }

  adicionarItem(): void {
    this.itens.push(this.novoItem());
  }

  removerItem(index: number): void {
    if(this.itens.length == 1) {
      alert('Não é possível ter 0 itens no pedido');
      return;
    }
    this.itens.removeAt(index);
  }

  exibirPrecosDeItem(produtoId: string, index: number): void {
    let produto = this.produtos.find(produto => produto.id == produtoId);
    let item = this.orderLines.at(index);
    item.get('unitaryPrice').setValue(produto.combinedPrice);
    item.get('additionalCosts').setValue(produto.additionalCosts);
  }

  popularListaProdutos(): void {
    this.produtoService.getByCliente(this.pedido.get('customerId').value).then(produtos => 
      this.produtos = produtos
    ).catch((error) => {
      if(error.status == 404) {
        this.limparListaProdutos();
      }
    });
  }

  isNovoPedido(): boolean {
    return !this.pedido.get('id').value;
  }

  isPedidoAberto(): boolean {
    return this.pedido.get('status').value == StatusPedido.ABERTO;
  }

  isPedidoAprovado(): boolean {
    return this.pedido.get('status').value == StatusPedido.APROVADO;
  }

  isPedidoFaturado(): boolean {
    return this.pedido.get('status').value == StatusPedido.FATURADO;
  }

  isPedidoCancelado(): boolean {
    return this.pedido.get('status').value == StatusPedido.CANCELADO;
  }

  private novoItem(): FormGroup {
    return this.formBuilder.group({
      orderId: [''],
      quantity: ['', Validators.required],
      unitaryPrice: ['', Validators.required],
      additionalCosts: ['', Validators.required],
      totalPrice: [''],
      productId: ['', Validators.required],
      valid: [''],
      notifications: [''],
      id: ['']
    });
  }

  private popularListaClientes(): void {
    this.clienteService.getAll().then(clientes => 
      this.clientes = clientes
    );
  }

  private desabilitarCampos(): void {
    if(this.pedido.get('id')?.value) {
      this.pedido.disable();
      if(this.edicao) {
        this.pedido.get('deliveryDate').enable();
        this.pedido.get('observation').enable();
        this.pedido.get('orderLines').enable();
      }
    } else {
      this.pedido.enable();
    }
  }

  private limparListaProdutos(): void {
    this.produtos = [] as Product[];
  }

  private converterCamposNumber(): void {
    for(let i = 0; i < this.orderLines.length; i++){
      let item = this.orderLines.at(i);
      item.get('quantity').patchValue(Number.parseInt(item.get('quantity').value));
    };
  }

  private exibirErro(error: any): void {
    console.error("Erro ao criar cadastro de pedido:\n"
          + `Status: ${error.error.status}\n` 
          + `Erro: ${error.error.title} \n`
          + `${JSON.stringify(error.error, null, 2)}`);
  }

}
