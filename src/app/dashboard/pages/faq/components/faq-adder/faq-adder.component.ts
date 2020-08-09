import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { FaqService } from "../../faq.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { CreateStaticValueInput } from "src/app/common/generated-types";
import { tap } from "rxjs/operators";

@AutoUnsubscribe()
@Component({
  templateUrl: "./faq-adder.component.html",
  styleUrls: ["./faq-adder.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FaqAdderComponent implements OnInit, OnDestroy {
  faqAdderForm: FormGroup;
  submitLoading: boolean;
  staticId: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly faqService: FaqService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.faqService.getFaqs().subscribe((data) => {
      console.log(data);
      this.staticId = data.statics[0].id;
    });
    this.initFaqForm();
  }

  ngOnDestroy(): void {}

  private initFaqForm(): void {
    this.faqAdderForm = new FormGroup({
      titleAr: new FormControl(null, Validators.required),
      titleEn: new FormControl(null, Validators.required),
      contentEn: new FormControl("Answer in english"),
      contentAr: new FormControl("Answer in arabic"),
    });
  }

  submit(): void {
    const { contentAr, contentEn, titleAr, titleEn } = this.faqAdderForm.value;
    const faqInput: CreateStaticValueInput = {
      staticId: this.staticId,
      contentAr,
      contentEn,
      titleAr,
      titleEn,
    };

    this.submitLoading = true;

    this.faqService
      .createFaq(faqInput)
      .pipe(tap(() => (this.submitLoading = false)))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.notify.success("Faq has been created");
            this.router.navigate([".."], { relativeTo: this.route });
          } else {
            this.notify.info(response.message);
          }
        },
        error: () => this.notify.error("Something went wrong"),
      });
  }

  goBack(): void {
    this.router.navigate([".."], { relativeTo: this.route });
  }

  resetForm(): void {
    this.faqAdderForm.reset();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.faqAdderForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }
}
