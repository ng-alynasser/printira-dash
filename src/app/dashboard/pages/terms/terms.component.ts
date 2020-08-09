import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { TermsService } from "./terms.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { tap } from "rxjs/operators";
import {
  CreateStaticValueInput,
  UpdateStaticValueInput,
} from "src/app/common/generated-types";

@AutoUnsubscribe()
@Component({
  selector: "app-terms",
  templateUrl: "./terms.component.html",
  styleUrls: ["./terms.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent implements OnInit, OnDestroy {
  termsForm: FormGroup;
  staticId: string;
  staticValueId: string;
  exist: boolean;

  constructor(
    private readonly termsService: TermsService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit() {
    this.termsForm = new FormGroup({
      contentAr: new FormControl("Content In Arabic"),
      contentEn: new FormControl("Content In English"),
    });

    this.termsService
      .getTerms()
      .pipe(
        tap((data) => {
          this.staticId = data[0].id;
          if (data && data[0].values && data[0].values.length) {
            const termsArr = data[0].values;
            this.staticValueId = data[0].values[termsArr.length - 1].id;
            this.termsForm.patchValue({
              contentAr: data[0].values[termsArr.length - 1].contentAr,
              contentEn: data[0].values[termsArr.length - 1].contentEn,
            });
            this.exist = true;
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {}

  submit(): void {
    this.termsForm.markAllAsTouched();

    const { contentAr, contentEn } = this.termsForm.value;

    if (this.exist) {
      const termsInput: UpdateStaticValueInput = {
        staticValueId: this.staticValueId,
        titleAr: "الشروط و الأحكام",
        titleEn: "Terms And Conditions",
        contentAr,
        contentEn,
      };

      this.termsService.editTerms(termsInput).subscribe({
        next: (response) => {
          if (response.success) {
            this.notify.success("Terms has been updated");
          } else {
            this.notify.info(response.message);
          }
        },
        error: () => this.notify.error("Something went wrong"),
      });
    } else {
      const termsInput: CreateStaticValueInput = {
        staticId: this.staticId,
        titleAr: "الشروط و الأحكام",
        titleEn: "Terms And Conditions",
        contentAr,
        contentEn,
      };
      this.termsService.createTerms(termsInput).subscribe({
        next: (response) => {
          if (response.success) {
            this.notify.success("Terms has been created");
          } else {
            this.notify.info(response.message);
          }
        },
        error: () => this.notify.error("Something went wrong"),
      });
    }
  }
}
