import { Component, Input } from '@angular/core';
import { NewsLetter } from '../../../../shared/interface/theme.interface';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss'],
    standalone: false
})
export class NewsletterComponent {

  @Input() data: NewsLetter | null;
  @Input() style: string = 'basic';
}
