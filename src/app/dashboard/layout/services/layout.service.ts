import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { share, delay } from 'rxjs/operators';

@Injectable()
export class LayoutService {

  protected layoutSize$ = new Subject();

  changeLayoutSize() {
    this.layoutSize$.next();
  }

  onChangeLayoutSize(): Observable<any> {
    return this.layoutSize$
      .pipe(
        share(),
        delay(1),
      );
  }
}