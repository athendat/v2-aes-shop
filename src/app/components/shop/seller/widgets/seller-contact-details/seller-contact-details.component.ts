import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';

@Component({
    selector: 'app-seller-contact-details',
    templateUrl: './seller-contact-details.component.html',
    styleUrls: ['./seller-contact-details.component.scss'],
    standalone: false
})
export class SellerContactDetailsComponent {

  @Input() store: Stores;

}
