import { Params } from "../interface/core.interface";
import { QuestionAnswers } from "../interface/questions-answers.interface";

export class GetQuestionAnswers {
    static readonly type = "[Question] Get";
    constructor(public slug: Params) { }
}

export class SetQuestions {
    static readonly type = "[Question] Set";
    constructor(public payload: QuestionAnswers[]) {}
  }

export class SendQuestion {
    static readonly type = "[Question] Post";
    constructor(public payload: Params) { }
}

export class UpdateQuestionAnswers {
    static readonly type = "[Question] put";
    constructor(public payload: Params, public id: number) { }
}


export class Feedback {
    static readonly type = "[Question] Feedback Post";
    constructor(public payload: Params, public type?: string) { }
}
