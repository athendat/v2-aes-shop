import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { QnAModel } from '../interface/questions-answers.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsAnswersService {
  private http = inject(HttpClient);


  public skeletonLoader: boolean = false;

  getQuestionAnswers(slug: Params): Observable<QnAModel> {
    return this.http.get<QnAModel>(`/questions.json`,  { params: slug });
  }

}
