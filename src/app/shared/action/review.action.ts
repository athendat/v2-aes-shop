import { Params } from "../interface/core.interface";
import { Review } from "../interface/review.interface";

export class GetReview {
  static readonly type = "[Review] Get";
  constructor(public payload: Params) {}
}

export class SetReviews {
  static readonly type = "[Review] Set";
  constructor(public payload: Review[]) {}
}

export class SendReview {
  static readonly type = "[Review] Post";
  constructor(public payload: Params) {}
}

export class UpdateReview {
  static readonly type = "[Review] Put";
  constructor(public id: string, public payload: Params) {}
}
