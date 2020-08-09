import { Component, OnInit, OnDestroy } from "@angular/core";
import { SplashScreenService } from "./dashboard/layout/services/splash-screen.service";
import { Router, NavigationEnd } from "@angular/router";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Subscription } from "rxjs";

@AutoUnsubscribe()
@Component({
  selector: "body[app-root]",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  navigationEnd$: Subscription;
  loader: boolean;
  constructor(
    private splashScreenService: SplashScreenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navigationEnd$ = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.splashScreenService.hide();
        window.scroll(0, 0);
        setTimeout(() => {
          document.body.classList.add("page-loaded");
        }, 500);
      }
    });
  }

  ngOnDestroy(): void {}
}
