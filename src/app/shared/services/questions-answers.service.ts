import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { Params } from '../interface/core.interface';
import { QnAModel, QuestionAnswers } from '../interface/questions-answers.interface';
import { RestResponse } from '../types/common.types';

@Injectable({
    providedIn: 'root'
})
export class QuestionsAnswersService {
    private http = inject(HttpClient);


    public skeletonLoader: boolean = false;

    getQuestionAnswers(slug: Params): Observable<QnAModel> {
        return this.http.get<QnAModel>(`/questions`, { params: slug });
    }

    createQuestion(question: Params): Observable<RestResponse<QuestionAnswers>> {
        return this.http.post<RestResponse<QuestionAnswers>>(`/questions`, question);
    }

}
