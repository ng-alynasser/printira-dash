import { Injectable } from "@angular/core";
import {
  StaticsGQL,
  CreateStaticValueGQL,
  UpdateStaticValueGQL,
  PaginatorInput,
  FilterStaticInput_Board,
  StaticKeyEnum,
  CreateStaticValueInput,
  StaticValueByIdGQL,
  UpdateStaticValueInput,
} from "src/app/common/generated-types";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FaqService {
  constructor(
    private readonly faqGQL: StaticsGQL,
    private readonly faqByIdGQL: StaticValueByIdGQL,
    private readonly createFaqGQL: CreateStaticValueGQL,
    private readonly updateFaqGQL: UpdateStaticValueGQL
  ) {}

  getFaqs(
    paginate?: PaginatorInput,
    filter?: FilterStaticInput_Board,
    sort?: string
  ) {
    return this.faqGQL
      .watch({
        paginate,
        filter: { key: StaticKeyEnum.FAQS, ...filter },
        sort,
      })
      .valueChanges.pipe(map((response) => response.data.statics_board.data));
  }

  getFaqById(staticValueId: string) {
    return this.faqByIdGQL
      .watch({ staticValueId })
      .valueChanges.pipe(
        map((response) => response.data.findStaticValueById.data)
      );
  }

  createFaq(input: CreateStaticValueInput) {
    return this.createFaqGQL
      .mutate({ input })
      .pipe(map((response) => response.data.createStaticValue));
  }

  updateFaq(input: UpdateStaticValueInput) {
    return this.updateFaqGQL
      .mutate({ input })
      .pipe(map((response) => response.data.updateStaticValue));
  }
}
