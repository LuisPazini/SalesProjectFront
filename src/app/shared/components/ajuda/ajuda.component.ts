import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ajuda',
  templateUrl: './ajuda.component.html',
  styleUrls: ['./ajuda.component.sass']
})
export class AjudaComponent implements OnInit {

  @ViewChild('modal') modal: any;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open(): void {
    this.modalService.open(this.modal);
  }

}
