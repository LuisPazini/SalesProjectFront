import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotaFiscalService } from 'src/app/shared/services/nota-fiscal.service';

@Component({
  selector: 'app-nota-fiscal',
  templateUrl: './nota-fiscal.component.html',
  styleUrls: ['./nota-fiscal.component.sass']
})
export class NotaFiscalComponent implements OnInit {

  @ViewChild('modal') modal: any;

  idNotaFiscal: string;

  constructor(
    private notaFiscalService: NotaFiscalService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open(idNotaFiscal: string): void {
    this.idNotaFiscal = idNotaFiscal;
    this.modalService.open(this.modal);
  }

  baixarPDF(): void {
    this.notaFiscalService.baixarNotaFiscalPDF(this.idNotaFiscal).then(
      res => {
        alert(res);
      },
      error => {
        console.error(error.error);
        alert(error.error.message);
      }
    )
  }

  baixarXML(): void {
    this.notaFiscalService.baixarNotaFiscalXML(this.idNotaFiscal).then(
      res => {
        alert(res);
      },
      error => {
        console.error(error.error);
        alert(error.error.message);
      }
    )
  }

}
