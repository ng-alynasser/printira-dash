import { Injectable } from "@angular/core";
import {
  OptionsGQL,
  CreateOptionGQL,
  PaginatorInput,
  FilterOptionInput_Board,
  CreateOptionInput,
  OptionSetsGQL,
  OptionByIdGQL,
  UpdateOptionGQL,
  UpdateOptionInput,
} from "src/app/common/generated-types";
import { map, tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class OptionsService {
  constructor(
    private readonly optionsGQL: OptionsGQL,
    private readonly optionIdGQL: OptionByIdGQL,
    private readonly optionsSetsGQL: OptionSetsGQL,
    private readonly createOptionGQL: CreateOptionGQL,
    private readonly updateOptionGQL: UpdateOptionGQL
  ) {}

  getAll(
    paginate?: PaginatorInput,
    filter?: FilterOptionInput_Board,
    sort?: string
  ) {
    return this.optionsGQL
      .watch({ sort, filter, paginate })
      .valueChanges.pipe(map((response) => response.data.options_board.data));
  }

  getOptionById(optionId: string) {
    return this.optionIdGQL
      .watch({ optionId })
      .valueChanges.pipe(map((response) => response.data.findOptionById.data));
  }

  getOptionSets() {
    return this.optionsSetsGQL
      .watch()
      .valueChanges.pipe(
        map((response) => response.data.optionSets_board.data.optionSets)
      );
  }

  createOption(input: CreateOptionInput) {
    return this.createOptionGQL
      .mutate({ input })
      .pipe(map((response) => response.data.createOption));
  }

  updateOption(optionId: string, input: UpdateOptionInput) {
    return this.updateOptionGQL
      .mutate({ optionId, input })
      .pipe(map((response) => response.data.updateOption));
  }
}
