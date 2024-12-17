import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ReviewModel } from '../interface/review.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);


  getReview(slug: Params): Observable<ReviewModel> {
    return this.http.get<ReviewModel>(`${environment.URL}/review.json`,  { params: slug });
  }

}
