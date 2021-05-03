import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { Product } from 'src/app/shared/models/product';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.sass']
})
export class CadastroComponent implements OnInit {

  @ViewChild('formulario') form: any;
  edicao: boolean = false;

  produto = this.formBuilder.group({
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
    private produtoService: ProdutoService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  salvar(produto: Product): void {
    this.produtoService.salvar(produto).then(
      res => {
        alert("Cliente cadastrado com sucesso!");
      },
      error => {
        console.error("Erro ao criar cadastro de produto:\n"
        + `Status: ${error.error.status}\n` 
        + `Erro: ${error.error.title} \n`
        + `${JSON.stringify(error.error, null, 2)}`);
      }
    );
  }

  remover(produto: Product): void {
    this.produtoService.remover(produto);
  }

  open(produto?: Product, edicao: boolean = false): void {
    this.edicao = edicao;
    if(produto) {
      this.produto.setValue(produto);
    }
    this.modalService.open(this.form);
    this.desabilitarCampos();
  }

  private desabilitarCampos(): void {
    if(this.produto.get('id')?.value) {
      this.produto.disable();
      if(this.edicao) {
        this.produto.get('phone')?.enable();
        this.produto.get('stateRegistration')?.enable();
        this.produto.get('municipalRegistration')?.enable();
      }
    } else {
      this.produto.enable();
    }
  }

}
