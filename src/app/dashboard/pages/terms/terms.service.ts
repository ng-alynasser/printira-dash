import { Injectable } from "@angular/core";
import {
  StaticsGQL,
  CreateStaticValueGQL,
  UpdateStaticValueGQL,
  StaticKeyEnum,
  CreateStaticValueInput,
  UpdateStaticValueInput,
} from "src/app/common/generated-types";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TermsService {
  constructor(
    private readonly termsGQL: StaticsGQL,
    private readonly createTermsGQL: CreateStaticValueGQL,
    private readonly updateTermsGQL: UpdateStaticValueGQL
  ) {}

  getTerms() {
    return this.termsGQL
      .watch({
        filter: { key: StaticKeyEnum.TERMS },
        sort: "createdAt",
      })
      .valueChanges.pipe(
        map((response) => response.data.statics_board.data.statics)
      );
  }

  createTerms(input: CreateStaticValueInput) {
    return this.createTermsGQL
      .mutate({ input })
      .pipe(map((response) => response.data.createStaticValue));
  }

  editTerms(input: UpdateStaticValueInput) {
    return this.updateTermsGQL
      .mutate({ input })
      .pipe(map((response) => response.data.updateStaticValue));
  }
}
