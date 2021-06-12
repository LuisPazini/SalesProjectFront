import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';

import { Customer } from 'src/app/shared/models/customer';
import { Product } from 'src/app/shared/models/product';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.sass']
})
export class CadastroComponent implements OnInit {

  @ViewChild('formulario') form: any;
  @Output('cadastrado') cadastrado: EventEmitter<void> = new EventEmitter<void>();

  clientes: Customer[] = [] as Customer[];
  edicao: boolean = false;

  produto = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    ncmCode: ['', Validators.required],
    combinedPrice: ['', Validators.required],
    additionalCosts: [''],
    combinedQuantity: ['', Validators.required],
    details: [''],
    customerId: ['', Validators.required],
    valid: [''],
    notifications: ['']
  });

  constructor(
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  salvar(produto: Product): void {
    this.converterCamposNumber(produto);
    this.produtoService.salvar(produto).then(
      res => {
        alert("Produto cadastrado com sucesso!");
        this.modalService.dismissAll();
        this.produto.reset();
        this.cadastrado.emit();
      },
      error => {
        console.error("Erro ao criar cadastro de produto:\n"
        + `Status: ${error.error.status}\n` 
        + `Erro: ${error.error.title} \n`
        + `${JSON.stringify(error.error, null, 2)}`);
        alert("Ocorreu um erro ao cadastrar produto");
      }
    );
  }

  remover(produto: Product): void {
    if(confirm('Tem certeza de que deseja remover este Produto?')) {
      this.produtoService.remover(produto).then(
        res => {
          alert("Produto removido com sucesso!");
          this.modalService.dismissAll();
          this.produto.reset();
          this.cadastrado.emit();
        },
        error => {
          console.error("Erro ao remover produto:\n"
          + `Status: ${error.error.status}\n` 
          + `Erro: ${error.error.title} \n`
          + `${JSON.stringify(error.error, null, 2)}`);
          alert("Ocorreu um erro ao remover produto");
        }
      );
    }
  }

  open(produto?: Product, edicao: boolean = false): void {
    this.edicao = edicao;
    this.produto.reset();
    if(produto) {
      this.produto.patchValue(produto);
    }
    if(this.authService.isUserCustomer()) {
      this.produto.get('customerId').setValue(this.authService.getCustomer());
    }
    this.modalService.open(this.form, { size: 'lg' });
    this.desabilitarCampos();
  }

  private desabilitarCampos(): void {
    if(this.produto.get('id')?.value) {
      this.produto.disable();
      if(this.edicao) {
        this.habilitarCamposEdicao();
      }
    } else {
      this.produto.enable();
      if(this.authService.isUserCustomer()) {
        this.produto.get('customerId').disable();
      }
    }
  }

  private habilitarCamposEdicao(): void {
    this.produto.get('combinedQuantity')?.enable();
    this.produto.get('combinedPrice')?.enable();
    this.produto.get('additionalCosts')?.enable();
    this.produto.get('details')?.enable();
  }

  private listarClientes(): void {
    this.clienteService.getAll().then(clientes => this.clientes = clientes);
  }

  private converterCamposNumber(produto: Product): void {
    produto.combinedPrice = Number.parseFloat(produto.combinedPrice.toString());
    produto.additionalCosts = Number.parseFloat(produto.additionalCosts.toString()) || 0;
    produto.combinedQuantity = Number.parseFloat(produto.combinedQuantity.toString());
  }

}
