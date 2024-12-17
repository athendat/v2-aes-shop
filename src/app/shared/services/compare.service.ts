import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CompareModel } from '../interface/compare.interface';

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  private http = inject(HttpClient);


  public skeletonLoader: boolean = false;

  getCompareItems(): Observable<CompareModel> {
    return this.http.get<CompareModel>(`${environment.URL}/compare.json`);
  }

}
