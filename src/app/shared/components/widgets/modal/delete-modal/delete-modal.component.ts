import { Component, ViewChild, TemplateRef, Output, EventEmitter, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss'],
    standalone: true,
    imports: [ButtonComponent, TranslateModule]
})
export class DeleteModalComponent {
  private modalService = inject(NgbModal);
  private platformId = inject<Object>(PLATFORM_ID);


  public closeResult: string;
  public modalOpen: boolean = false;
  public userAction = {};

  @ViewChild("deleteModal", { static: false }) DeleteModal: TemplateRef<string>;

  @Output() deleteItem: EventEmitter<any> = new EventEmitter();

  async openModal(action: string, data: any) {
    if (isPlatformBrowser(this.platformId)) { // For SSR 
      this.modalOpen = true;
      this.userAction = {
        actionToPerform: action,
        data: data
      };
      this.modalService.open(this.DeleteModal, {
        ariaLabelledBy: 'Delete-Modal',
        centered: true,
        windowClass: 'theme-modal text-center'
      }).result.then((result) => {
        `Result ${result}`
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  delete() {
    this.deleteItem.emit(this.userAction);
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
