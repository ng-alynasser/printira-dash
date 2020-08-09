import { Injectable } from "@angular/core";
import {
  MessagesGQL,
  FilterMessageInput,
  PaginatorInput,
} from "src/app/common/generated-types";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MessagesService {
  constructor(private readonly messagesGQL: MessagesGQL) {}

  getAll(
    paginate?: PaginatorInput,
    filter?: FilterMessageInput,
    sort?: string
  ) {
    return this.messagesGQL
      .watch({
        paginate,
        filter,
        sort,
      })
      .valueChanges.pipe(
        map((response) => response.data.messages.data.messages)
      );
  }
}
