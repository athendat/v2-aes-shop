import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss'],
    standalone: false
})
export class SearchBoxComponent {

  @Input() style: string = 'basic';
  
}
