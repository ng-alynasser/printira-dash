import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewEncapsulation,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AboutUsService } from "./about-us.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { tap } from "rxjs/operators";
import {
  CreateStaticValueInput,
  UpdateStaticValueInput,
} from "src/app/common/generated-types";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent implements OnInit, OnDestroy {
  aboutUsForm: FormGroup;
  staticId: string;
  staticValueId: string;
  exist: boolean;

  constructor(
    private readonly aboutUsService: AboutUsService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit() {
    this.aboutUsForm = new FormGroup({
      contentAr: new FormControl("Content In Arabic"),
      contentEn: new FormControl("Content In English"),
    });

    this.aboutUsService
      .getAboutUs()
      .pipe(
        tap((data) => {
          this.staticId = data[0].id;
          if (data && data[0].values && data[0].values.length) {
            const aboutUsArr = data[0].values;
            this.staticValueId = data[0].values[aboutUsArr.length - 1].id;
            this.aboutUsForm.patchValue({
              contentAr: data[0].values[aboutUsArr.length - 1].contentAr,
              contentEn: data[0].values[aboutUsArr.length - 1].contentEn,
            });
            this.exist = true;
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {}

  submit(): void {
    this.aboutUsForm.markAllAsTouched();

    const { contentAr, contentEn } = this.aboutUsForm.value;

    if (this.exist) {
      const aboutUsInput: UpdateStaticValueInput = {
        staticValueId: this.staticValueId,
        titleAr: "من نحن",
        titleEn: "About Us",
        contentAr: "Content In Arabic",
        contentEn: "Content In English",
      };

      this.aboutUsService.editAboutUs(aboutUsInput).subscribe({
        next: (response) => {
          if (response.success) {
            this.notify.success("About us has been updated");
          } else {
            this.notify.info(response.message);
          }
        },
        error: () => this.notify.error("Something went wrong"),
      });
    } else {
      const aboutUsInput: CreateStaticValueInput = {
        staticId: this.staticId,
        titleAr: "من نحن",
        titleEn: "About Us",
        contentAr,
        contentEn,
      };

      this.aboutUsService.createAboutUs(aboutUsInput).subscribe({
        next: (response) => {
          if (response.success) {
            this.notify.success("About us has been created");
          } else {
            this.notify.info(response.message);
          }
        },
        error: () => this.notify.error("Something went wrong"),
      });
    }
  }
}
