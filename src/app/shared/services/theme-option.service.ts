import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ThemeOption } from '../interface/theme-option.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeOptionService {
  private http = inject(HttpClient);


  public preloader: boolean = true;
  public theme_color: string;

  getThemeOption(): Observable<ThemeOption> {
    return this.http.get<ThemeOption>(`${environment.URL}/theme-option.json`);
  }

}
