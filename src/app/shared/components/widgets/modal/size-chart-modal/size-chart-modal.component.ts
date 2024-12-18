import { Component, TemplateRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Attachment } from '../../../../../shared/interface/attachment.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-size-chart-modal',
    templateUrl: './size-chart-modal.component.html',
    styleUrls: ['./size-chart-modal.component.scss'],
    imports: [ButtonComponent, TranslateModule]
})
export class SizeChartModalComponent {
  private modalService = inject(NgbModal);
  private platformId = inject<Object>(PLATFORM_ID);


  @ViewChild("sizeChartModal", { static: false }) SizeChartModal: TemplateRef<string>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public image: Attachment;

  async openModal(image: Attachment) {
    if (isPlatformBrowser(this.platformId)) { // For SSR
      this.image = image;
      this.modalOpen = true;
      this.modalService.open(this.SizeChartModal, {
        ariaLabelledBy: 'profile-Modal',
        centered: true,
        windowClass: 'theme-modal modal-lg'
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
}
