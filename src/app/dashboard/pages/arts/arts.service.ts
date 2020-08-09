import { Injectable } from "@angular/core";
import {
  ArtsGQL,
  CreateArtGQL,
  PaginatorInput,
  FilterArtInput_Board,
  CreateArtInput,
  ArtByIdGQL,
  UpdateArtGQL,
  UpdateArtInput,
} from "src/app/common/generated-types";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ArtsService {
  constructor(
    private readonly artsGQL: ArtsGQL,
    private readonly artByIdGQL: ArtByIdGQL,
    private readonly createArtGQL: CreateArtGQL,
    private readonly updateArtGQL: UpdateArtGQL
  ) { }

  getAll(
    paginate?: PaginatorInput,
    filter?: FilterArtInput_Board,
    sort?: string
  ) {
    return this.artsGQL
      .watch({ sort, paginate, filter })
      .valueChanges.pipe(map((response) => response.data.arts_board));
  }

  getArtById(artId: string) {
    return this.artByIdGQL
      .watch({ artId })
      .valueChanges.pipe(map((response) => response.data.findArtById.art));
  }

  createArt(input: CreateArtInput) {
    return this.createArtGQL
      .mutate({ input })
      .pipe(map((response) => response.data.createArt));
  }

  updateArt(artId: string, input: UpdateArtInput) {
    return this.updateArtGQL
      .mutate({ artId, input })
      .pipe(map((response) => response.data.updateArt));
  }
}
