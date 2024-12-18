import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Paris } from '../interface/theme.interface';
import { RestResponse } from '../types/common.types';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private http = inject(HttpClient);


  getHomePage(slug?: string): Observable<any> {
    if(!slug) {
      slug = 'paris';
    }
    return this.http.get<RestResponse<Paris>>(`/themes/slug/${slug}`).pipe(
        map(response => response.data)
    );
    // return this.http.get(`/themes/${slug}.json`);
  }

}
