import { Injectable } from "@angular/core";
import {
  MockupsGQL,
  CreateMockupGQL,
  PaginatorInput,
  FilterProductInput_Board,
  CreateMockupInput,
  UpdateMockupGQL,
  UpdateProductInput,
  MockupByIdGQL,
} from "src/app/common/generated-types";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MockupService {
  constructor(
    private readonly mockupsGQL: MockupsGQL,
    private readonly mockupByIdGQL: MockupByIdGQL,
    private readonly createMockupGQL: CreateMockupGQL,
    private readonly updateMockupGQL: UpdateMockupGQL
  ) {}

  getAll(
    paginate?: PaginatorInput,
    filter?: FilterProductInput_Board,
    sort?: string
  ) {
    return this.mockupsGQL
      .watch({ sort, filter, paginate })
      .valueChanges.pipe(map((response) => response.data.mockups_board.data));
  }

  getMockupById(productId: string) {
    return this.mockupByIdGQL
      .watch({ productId })
      .valueChanges.pipe(map((response) => response.data.findProductById.data));
  }

  createMockup(input: CreateMockupInput) {
    return this.createMockupGQL
      .mutate({ input })
      .pipe(map((response) => response.data.createMockup));
  }

  updateMockUp(mockupId: string, input: UpdateProductInput) {
    return this.updateMockupGQL
      .mutate({ mockupId, input })
      .pipe(map((response) => response.data.updateMockup));
  }
}
