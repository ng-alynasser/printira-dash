import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { NotificationService } from "./notification.service";

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.notifyOnError(event);
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.notifyOnError(err);
          } else {
            this.displayErrorNotication(err.message);
          }
        }
      )
    );
  }

  private notifyOnError(response: HttpResponse<any> | HttpErrorResponse) {
    if (response instanceof HttpErrorResponse) {
      if (response.status === 0) {
        this.displayErrorNotication("Could not connect to server!");
      } else {
        this.displayErrorNotication(response.toString());
      }
    } else {
      const graphQLErrors = response.body.errors;
      if (graphQLErrors && Array.isArray(graphQLErrors)) {
        const msg = graphQLErrors.map((err) => err.message).join("\n");
        this.displayErrorNotication(msg);
      }
    }
  }

  private displayErrorNotication(message: string): void {
    const notificationService = this.injector.get<NotificationService>(
      NotificationService
    );
    notificationService.error(message);
  }
}
