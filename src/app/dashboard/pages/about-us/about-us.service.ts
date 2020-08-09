import { Injectable } from "@angular/core";
import {
  StaticsGQL,
  StaticKeyEnum,
  CreateStaticValueInput,
  CreateStaticValueGQL,
  UpdateStaticValueGQL,
  UpdateStaticValueInput,
} from "src/app/common/generated-types";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AboutUsService {
  constructor(
    private readonly aboutUsGQL: StaticsGQL,
    private readonly createAboutUsGQL: CreateStaticValueGQL,
    private readonly updateAboutUsGQL: UpdateStaticValueGQL
  ) {}

  getAboutUs() {
    return this.aboutUsGQL
      .watch({ filter: { key: StaticKeyEnum.ABOUT_US }, sort: "createdAt" })
      .valueChanges.pipe(
        map((response) => response.data.statics_board.data.statics)
      );
  }

  createAboutUs(input: CreateStaticValueInput) {
    return this.createAboutUsGQL
      .mutate({ input })
      .pipe(map((response) => response.data.createStaticValue));
  }

  editAboutUs(input: UpdateStaticValueInput) {
    return this.updateAboutUsGQL
      .mutate({ input })
      .pipe(map((response) => response.data.updateStaticValue));
  }
}
