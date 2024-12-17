import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';

@Component({
    selector: 'app-header-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    standalone: false
})
export class CategoriesBlockComponent {

  @Input() data: Option | null;

} 
