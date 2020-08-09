import { Injectable } from "@angular/core";
import {
  CreateStaticValueGQL,
  PaginatorInput,
  CreateStaticValueInput,
  StaticKeyInput,
  FilterStaticValueInput_Board,
  StaticValuesByTypeGQL,
  StaticValueByIdGQL,
  UpdateStaticValueInput,
  UpdateStaticValueGQL,
} from "src/app/common/generated-types";
import { map, tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class ArticlesService {
  constructor(
    private readonly articleById: StaticValueByIdGQL,
    private readonly articlesGQL: StaticValuesByTypeGQL,
    private readonly createArticleGQL: CreateStaticValueGQL,
    private readonly updateArticleGQL: UpdateStaticValueGQL
  ) {}

  public staticId: string;

  getAll(
    input: StaticKeyInput,
    paginate?: PaginatorInput,
    filter?: FilterStaticValueInput_Board,
    sort?: string
  ) {
    return this.articlesGQL
      .watch({
        paginate,
        filter,
        sort,
        input,
      })
      .valueChanges.pipe(
        map((response) => response.data.getStaticValuesByType_board.data),
        tap(({ staticValues }) => {
          if (staticValues.length) {
            this.staticId = staticValues[0].static.id;
          }
        })
      );
  }

  getArticleById(staticValueId: string) {
    return this.articleById
      .watch({ staticValueId })
      .valueChanges.pipe(
        map((response) => response.data.findStaticValueById.data)
      );
  }

  createArticle(input: CreateStaticValueInput) {
    return this.createArticleGQL
      .mutate({ input })
      .pipe(map((response) => response.data.createStaticValue));
  }

  updateArticle(input: UpdateStaticValueInput) {
    return this.updateArticleGQL
      .mutate({ input })
      .pipe(map((response) => response.data.updateStaticValue));
  }
}
