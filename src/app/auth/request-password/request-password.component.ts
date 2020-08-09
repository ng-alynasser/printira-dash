import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import {
  NB_AUTH_OPTIONS,
  NbAuthService,
  NbRequestPasswordComponent,
} from "@nebular/auth";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: "request-password.component.html",
  styleUrls: ["request-password.component.scss"],
})
export class RequestPasswordComponent extends NbRequestPasswordComponent {
  submitted = false;
  messages: string[];
  errors: string[];
  showMessages = {
    success: true,
    failure: true,
  };

  user = {
    email: "",
  };

  constructor(
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options,
    cd: ChangeDetectorRef,
    private routes: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    super(service, options, cd, routes);
  }

  requestPassword(): void {
    // this.errors = [];
    // this.submitted = true;
    // this.authService
    //   .requestPassword(this.user.email)
    //   .subscribe(data => {
    //       this.submitted = false;
    //       this.messages = ['Please check your email'];
    //       this.route.queryParams.subscribe(params =>
    //         setTimeout(() => {
    //           this.router.navigate([params.redirect || '/auth/login']);
    //         }, 3000),
    //     );
    //   },
    //     error => {
    //     this.submitted = false;
    //     this.errors = ['Invalid Email'];
    //     }
    //   );
  }
}
