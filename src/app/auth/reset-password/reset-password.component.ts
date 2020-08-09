import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import {
  NB_AUTH_OPTIONS,
  NbAuthService,
  NbResetPasswordComponent,
} from "@nebular/auth";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: "reset-password.component.html",
  styleUrls: ["reset-password.component.scss"],
})
export class ResetPasswordComponent extends NbResetPasswordComponent {
  submitted = false;
  resetToken: null;
  currentState: any;
  messages: string[];
  errors: string[];

  showMessages = {
    success: true,
    failure: true,
  };

  user = {
    newPassword: "",
    confirmPassword: "",
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
    this.route.params.subscribe((params) => {
      this.resetToken = params.token;
      this.verifyToken();
    });
  }

  private verifyToken(): void {
    // this.authService.validPasswordToken(this.resetToken)
    //   .subscribe(
    //     data => {
    //       this.currentState = 'Verified';
    //     },
    //     error => {
    //       this.currentState = 'Not verified';
    //     },
    //   );
  }

  resetPassword(): void {
    // this.submitted = true;
    // this.errors = this.messages = [];
    // this.authService.resetPassword(this.resetToken, this.user.newPassword)
    //   .subscribe(
    //     data => {
    //       this.submitted = false;
    //       this.messages = ['Your password has been updated successfully'];
    //       this.route.queryParams.subscribe(params =>
    //         setTimeout(() => {
    //           this.router.navigate([params.redirect || '/auth/login'], { replaceUrl: true } );
    //         }, 3000),
    //       );
    //     },
    //     error => {
    //       this.submitted = false;
    //       this.errors = ['Something wrong happened'];
    //     }
    //   );
  }
}
